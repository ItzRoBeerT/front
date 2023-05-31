
const Comments = ({comments}) => {

    return(
        <>
        {comments.length > 0 ? 
        comments.map((res) => (
            <div key={res._id}>
                <p>{res.comment}</p>
            </div>
        ))
        :
         <p>no existen comentarios</p>}
        </>
    )
}

export default Comments;