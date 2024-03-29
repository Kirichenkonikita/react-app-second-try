import classNameObj from "./Post.module.css";

function Post(props: any) {
    return (
        <div className={classNameObj.PostContainer}>
            <img src="https://cs10.pikabu.ru/post_img/big/2020/04/26/8/1587908170110974162.jpg" alt="Аватарка отправителя" />
            <div><p>{props.text}</p></div>
        </div>
    )
}

export default Post;