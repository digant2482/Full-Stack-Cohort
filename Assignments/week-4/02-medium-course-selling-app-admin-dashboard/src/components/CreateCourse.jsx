import React from "react";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [published, setPublished] = React.useState(false);
    const [text, setText] = React.useState("");
    const authKey = localStorage.getItem("Auth-Key");
    const token = "Bearer " + authKey;

    const createTodo = () => {
        let body = { title, description, price, imageLink, published};
        axios.post("http://localhost:3000/admin/courses", body, {headers : {token : token}}).then((response) => {
            if (response.status === 200){
                setText(response.data.message);
            }
            else {
                setText("Error, please try again")
            }
        });        
    }

    return <div>
        <h1>Create new course</h1>
        <br />
        Title - <input type={"text"} onChange={e => setTitle(e.target.value)} />
        <br />
        Description - <input type={"text"} onChange={e => setDescription(e.target.value)} />
        <br />
        Price - <input type={"text"} onChange={e => setPrice(e.target.value)} />
        <br />
        Image Link - <input type={"text"} onChange={e => setImageLink(e.target.value)} />
        <br />
        Published - <input type={"text"} onChange={e => setPublished(e.target.value)} />
        <br />
        <button onClick={createTodo}>Create Course</button>
        <br />
        <br />
        {text && text}
        <br/>
        
    </div>
}
export default CreateCourse;