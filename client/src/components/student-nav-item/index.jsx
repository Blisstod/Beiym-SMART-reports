import {Accordion} from "react-bootstrap";
import SubjectNavItem from "../subject-nav-item/index.jsx";

const StudentNavItem = () => {
    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey={'0'}>
                <Accordion.Header>student name</Accordion.Header>
                <Accordion.Body>
                    <SubjectNavItem subject={'math'} />
                    <SubjectNavItem subject={'commonScore'} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default StudentNavItem