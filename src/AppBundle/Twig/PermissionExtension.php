<?php

namespace AppBundle\Twig;

use Biz\Role\Util\PermissionBuilder;
use Topxia\Service\Common\ServiceKernel;

class PermissionExtension extends \Twig_Extension
{
    protected $container;

    protected $builder = null;

    protected $loader = null;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('parent_permission', array($this, 'getParentPermission')),
        );
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('permission', array($this, 'getPermissionByCode')),
            new \Twig_SimpleFunction('sub_permissions', array($this, 'getSubPermissions')),
            new \Twig_SimpleFunction('permission_path', array($this, 'getPermissionPath'), array('needs_context' => true, 'needs_environment' => true)),
            new \Twig_SimpleFunction('grouped_permissions', array($this, 'groupedPermissions')),
            new \Twig_SimpleFunction('has_permission', array($this, 'hasPermission')),
            new \Twig_SimpleFunction('eval_expression', array($this, 'evalExpression'), array('needs_context' => true, 'needs_environment' => true)),
            new \Twig_SimpleFunction('first_child_permission', array($this, 'getFirstChild')),
            new \Twig_SimpleFunction('side_bar_permission', array($this, 'getSideBar')),
        );
    }

    public function getSideBar($code)
    {
        /** todo  多次调用getParentPermission 需要优化 */
        $permission = $this->getParentPermission($code);
        $permission = $this->getParentPermission($permission['code']);
        $permission = $this->getParentPermission($permission['code']);
        $group = $this->createPermissionBuilder()->groupedV2Permissions($permission['code']);

        $permissionMenus = $this->buildChildPermissionMenus($group);

        return $permissionMenus;
    }

    protected function buildChildPermissionMenus($allGroup, $grade = 0)
    {
        $permissions = array();

        foreach ($allGroup as $key => &$children) {
            if (isset($children['visible']) && !$this->evalExpression($this->container->get('twig'), array(), $children['visible'])) {
                unset($allGroup[$key]);
                continue;
            }

            $childrenInfo = array();
            $childrenInfo['name'] = ServiceKernel::instance()->trans($children['name'], array(), 'menu');
            $childrenInfo['link'] = '';
            $childrenInfo['code'] = $children['code'];
            if (isset($children['is_group'])) {
                $childrenInfo['grade'] = 0;
            }
            foreach ($children['children'] as $k => $child) {
                $nodes = array();
                $nodes['name'] = ServiceKernel::instance()->trans($child['name'], array(), 'menu');
                $nodes['link'] = $this->getPermissionPath(array(), array(), $this->getFirstChild($this->getPermissionByCode($k)));
                $nodes['grade'] = 1;
                $nodes['code'] = $child['code'];
                $nodes['nodes'] = array();
                $childrenInfo['nodes'][] = $nodes;
            }
            $permissions[] = $childrenInfo;
        }

        return $permissions;
    }

    public function getFirstChild($menu)
    {
        $menus = $this->getSubPermissions($menu['code']);

        if (empty($menus)) {
            $permissions = $this->createPermissionBuilder()->getOriginSubPermissions($menu['code']);
            if (empty($permissions)) {
                return array();
            } else {
                $menus = $permissions;
            }
        }

        return current($menus);
    }

    public function getPermissionPath($env, $context, $menu)
    {
        $route = empty($menu['router_name']) ? $menu['code'] : $menu['router_name'];
        $params = empty($menu['router_params']) ? array() : $menu['router_params'];

        foreach ($params as $key => $value) {
            if (0 === strpos($value, '(')) {
                $value = $this->evalExpression($env, $context['_context'], $value);
                $params[$key] = $value;
            } else {
                $params[$key] = "{$value}";
            }
        }

        return $this->container->get('router')->generate($route, $params);
    }

    public function evalExpression($twig, $context, $code)
    {
        $code = trim($code);
        if (0 === strpos($code, '(')) {
            $code = substr($code, 1, strlen($code) - 2);
        } else {
            $code = "'{$code}'";
        }

        $loader = new \Twig_Loader_Array(array(
            'expression.twig' => '{{'.$code.'}}',
        ));

        $loader = new \Twig_Loader_Chain(array($loader, $twig->getLoader()));

        $twig->setLoader($loader);

        return $twig->render('expression.twig', $context);
    }

    public function getPermissionByCode($code)
    {
        return $this->createPermissionBuilder()->getOriginPermissionByCode($code);
    }

    public function hasPermission($code)
    {
        $currentUser = ServiceKernel::instance()->getCurrentUser();

        return $currentUser->hasPermission($code);
    }

    public function getSubPermissions($code, $group = null)
    {
        $permission = $this->getPermissionByCode($code);
        if (isset($permission['disable']) && $permission['disable']) {
            return $this->createPermissionBuilder()->getOriginSubPermissions($code, $group);
        } else {
            return $this->createPermissionBuilder()->getSubPermissions($code, $group);
        }
    }

    public function groupedPermissions($code)
    {
        return $this->createPermissionBuilder()->groupedPermissions($code);
    }

    public function getParentPermission($code)
    {
        $permission = $this->createPermissionBuilder()->getOriginPermissionByCode($code);

        if (isset($permission['disable']) && $permission['disable']) {
            $parent = $this->createPermissionBuilder()->getOriginPermissionByCode($permission['parent']);
        } else {
            $parent = $this->createPermissionBuilder()->getParentPermissionByCode($code);
        }

        return $parent;
    }

    private function createPermissionBuilder()
    {
        return PermissionBuilder::instance();
    }

    public function getName()
    {
        return 'permission.permission_extension';
    }
}
