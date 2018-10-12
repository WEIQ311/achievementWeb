import App from '../App'
import login from '../papes/login/login'
import student from '../papes/students/student'
import teacher from '../papes/teacher/teacher'
import studentGrade from '../papes/teacher/gradeManagement/studentGrade'
import classGrade from '../papes/teacher/gradeManagement/classGrade'
import studentManagement from '../papes/teacher/studentManagement/studentManagement'
import classManagement from '../papes/teacher/system/classManagement'
import teacherManagement from '../papes/teacher/system/teacherManagement'
import subjectManagement from '../papes/teacher/system/subjectManagement'
import semesterManagement from '../papes/teacher/system/semesterManagement'
export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    redirect:"/login",
    children: [
        {
            path: 'login',
            name: "login",
            component: login
        },{
            path: 'student',
            name: "student",
            component: student
        },{
            path: 'teacher',
            name: "teacher",
            component: teacher,
            children:[{
                path: 'studentGrade',
                name: "studentGrade",
                component: studentGrade,
            },{
                path: 'classGrade',
                name: "classGrade",
                component: classGrade,
            },{
                path: 'studentManagement',
                name: "studentManagement",
                component: studentManagement,
            },{
                path: 'classManagement',
                name: "classManagement",
                component: classManagement,
            },{
                path: 'teacherManagement',
                name: "teacherManagement",
                component: teacherManagement,
            },{
                path: 'subjectManagement',
                name: "subjectManagement",
                component: subjectManagement,
            },{
                path: 'semesterManagement',
                name: "semesterManagement",
                component: semesterManagement,
            }]
        }
    ]
}]