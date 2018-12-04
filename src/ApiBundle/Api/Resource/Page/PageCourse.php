<?php

namespace ApiBundle\Api\Resource\Page;

use ApiBundle\Api\ApiRequest;
use ApiBundle\Api\Annotation\ApiConf;
use ApiBundle\Api\Resource\AbstractResource;
use ApiBundle\Api\Annotation\ResponseFilter;
use AppBundle\Common\ArrayToolkit;

class PageCourse extends AbstractResource
{
    /**
     * @ApiConf(isRequiredAuth=false)
     * @ResponseFilter(class="ApiBundle\Api\Resource\Page\PageCourseFilter", mode="public")
     */
    public function get(ApiRequest $request, $portal, $courseId)
    {
        $course = $this->getCourseService()->getCourse($courseId);
        $member = $this->getCourseMemberService()->getCourseMember($courseId, $this->getCurrentUser()->getId());
        $course['learnedCompulsoryTaskNum'] = empty($member) ? 0 : $member['learnedCompulsoryTaskNum'];
        $isMemberNonExpired = empty($member) ? false : $this->getCourseMemberService()->isMemberNonExpired($course, $member);
        $course['member'] = $isMemberNonExpired ? $member : null;
        $this->getOCUtil()->single($course, array('creator', 'teacherIds'));
        $this->getOCUtil()->single($course, array('courseSetId'), 'courseSet');
        $course['access'] = $this->getCourseService()->canJoinCourse($courseId);

        $course['courseItems'] = $this->container->get('api.util.item_helper')->convertToLeadingItemsV2(
            $this->getCourseService()->findCourseItems($courseId),
            $course,
            $request->getHttpRequest()->isSecure(),
            $request->query->get('fetchSubtitlesUrls', 0),
            $request->query->get('onlyPublished', 0)
        );

        $course['allowAnonymousPreview'] = $this->getSettingService()->get('course.allowAnonymousPreview', 1);
        $course['courses'] = $this->getCourseService()->findPublishedCoursesByCourseSetId($course['courseSet']['id']);
        $course['courses'] = ArrayToolkit::sortPerArrayValue($course['courses'], 'seq');
        $course['progress'] = $this->getLearningDataAnalysisService()->makeProgress($course['learnedCompulsoryTaskNum'], $course['compulsoryTaskNum']);

        $reviews = $this->getCourseReviewService()->searchReviews(
            array('courseSetId' => $course['courseSet']['id'], 'private' => 0, 'parentId' => 0),
            array('updatedTime' => 'DESC'),
            0, 5
        );

        $this->getOCUtil()->multiple($reviews, array('userId'));
        $this->getOCUtil()->multiple($reviews, array('courseId'), 'course');
        foreach ($reviews as &$review) {
            $review['posts'] = $this->getCourseReviewService()->searchReviews(array('parentId' => $review['id']), array('updatedTime' => 'DESC'), 0, 5);
            $this->getOCUtil()->multiple($review['posts'], array('userId'));
            $this->getOCUtil()->multiple($review['posts'], array('courseId'), 'course');
        }
        $course['reviews'] = $reviews;

        return $course;
    }

    private function getCourseService()
    {
        return $this->service('Course:CourseService');
    }

    private function getCourseSetService()
    {
        return $this->service('Course:CourseSetService');
    }

    private function getCourseMemberService()
    {
        return $this->service('Course:MemberService');
    }

    private function getSettingService()
    {
        return $this->service('System:SettingService');
    }

    private function getLearningDataAnalysisService()
    {
        return $this->service('Course:LearningDataAnalysisService');
    }

    private function getCourseReviewService()
    {
        return $this->service('Course:ReviewService');
    }
}
