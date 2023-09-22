import React from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function CourseDetails () {
    const {courseId} = useParams();
    const [course, setCourse] = React.useState({});
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [published, setPublished] = React.useState(false);
    const authKey = localStorage.getItem("Auth-Key");
    const token = "Bearer " + authKey;
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log("here");
        axios.get("http://localhost:3000/admin/courses/" + courseId, {headers:{token : token}}).then((response) => {
        if (response.status === 200){
            setCourse(response.data);
        }
    })

    }, [])

    const updateTodo = () => {
        let body = { title, description, price, imageLink, published };
        axios.put("http://localhost:3000/admin/courses/" + courseId, body, {headers : { token }}).then((response) => {
            if (response.status === 200){
                navigate("/courses");
            }
        })
    }

    return  <div>
        <h1>Update couse</h1>
        <br />
        Title - {course.title}
        <br />
        Update Title - <input type={"text"} onChange={e => setTitle(e.target.value)} />
        <br />
        Description - {course.description};
        <br />
        Update Description - <input type={"text"} onChange={e => setDescription(e.target.value)} />
        <br />
        Price - {course.price}
        <br />
        Update Price - <input type={"text"} onChange={e => setPrice(e.target.value)} />
        <br />
        Image Link - {course.imageLink}
        <br />
        Update Image Link - <input type={"text"} onChange={e => setImageLink(e.target.value)} />
        <br />
        Published - {course.published}
        <br />
        Update Published - <input type={"text"} onChange={e => setPublished(e.target.value)} />
        <br />
        <button onClick={updateTodo}>Update todo</button>
        <br />
    </div>
}

export default CourseDetails