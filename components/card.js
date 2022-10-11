const Card  = ({ title, description, image }) => {
    return (
        <div className="card">
        <div className="card-image">
            <img src={image} />
        </div>
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
        </div>
    );
};

export default Card;