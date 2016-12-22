<?php
namespace AppBundle\Controller\Admin;

use Topxia\Common\Paginator;
use Topxia\Common\ArrayToolkit;
use Symfony\Component\HttpFoundation\Request;
use Topxia\Service\Common\ServiceKernel;

class CourseReviewController extends BaseController
{
    public function indexAction(Request $request)
    {
        $conditions = $request->query->all();

        if (!empty($conditions['courseTitle'])) {
            $courses                 = $this->getCourseService()->findCoursesByLikeTitle(trim($conditions['courseTitle']));
            $conditions['courseIds'] = ArrayToolkit::column($courses, 'id');
            if (count($conditions['courseIds']) == 0) {
                return $this->render('admin/course-review/index.html.twig', array(
                    'reviews'   => array(),
                    'users'     => array(),
                    'courses'   => array(),
                    'paginator' => new Paginator($request, 0, 20)
                ));
            }
        }

        $paginator = new Paginator(
            $request,
            $this->getReviewService()->searchReviewsCount($conditions),
            20
        );

        $conditions['parentId'] = 0;

        $reviews = $this->getReviewService()->searchReviews(
            $conditions,
            'latest',
            $paginator->getOffsetCount(),
            $paginator->getPerPageCount()
        );

        $users   = $this->getUserService()->findUsersByIds(ArrayToolkit::column($reviews, 'userId'));
        $courses = $this->getCourseService()->findCoursesByIds(ArrayToolkit::column($reviews, 'courseId'));

        return $this->render('admin/course-review/index.html.twig', array(
            'reviews'   => $reviews,
            'users'     => $users,
            'courses'   => $courses,
            'paginator' => $paginator
        ));
    }

    public function deleteAction(Request $request, $id)
    {
        $this->getReviewService()->deleteReview($id);
        return $this->createJsonResponse(true);
    }

    public function batchDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        foreach ($ids as $id) {
            $this->getReviewService()->deleteReview($id);
        }
        return $this->createJsonResponse(true);
    }

    protected function getCourseService()
    {
        return $this->getServiceKernel()->createService('Course:CourseService');
    }

    protected function getUserService()
    {
        return ServiceKernel::instance()->createService('User:UserService');
    }

    protected function getReviewService()
    {
        return $this->getServiceKernel()->createService('Course:ReviewService');
    }
}
