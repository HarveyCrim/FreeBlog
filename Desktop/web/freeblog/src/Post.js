import { format} from "date-fns";
import { Link } from "react-router-dom";
const parser = require("html-react-parser");
function Post(props){
    let text = parser(props.text);
    text = text.length > 40 ? text.substring(0,50) +"........": text;
    return (
        <div class="post">
            <img src={"http://localhost:4000/"+props.image} alt=""/>
            <div className="textOfPost">
            <Link to = {`/posts/${props.id}`}>
                <h2>{props.title}</h2>
                </Link>
                <span>{props.author.name}</span><time> {format(new Date(props.time),"MMM d, yyyy HH:mm")}</time>
                {text}
            </div>
        </div>
    );
}
export default Post;
