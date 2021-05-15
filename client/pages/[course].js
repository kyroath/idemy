import { useRouter } from 'next/router';
import CoursePageComponent from '../src/components/CoursePageComponent';
import Navbar from '../src/Navbar';

const course = () => {

    const router = useRouter();
    const {course} = router.query;
    return (
        <>
        <Navbar text = "COURSE PAGE" showMenu = "true" showSearch = "false" />
        <CoursePageComponent courseId = {course}></CoursePageComponent>        
        </>
    );  
};

export default course;