const Card = ({ title, value, icon, iconClass, change, changePositive }) => {
  return (
    <div className={`card fade-in`}>
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div className={`card-icon ${iconClass}`}>
          {icon}
        </div>
      </div>
      <div className="card-value">{value}</div>
      <div className={`card-change ${changePositive ? 'positive' : 'negative'}`}>
        {changePositive ? (
          <FaArrowUp className="change-icon" />
        ) : (
          <FaArrowDown className="change-icon" />
        )}
        {change}
      </div>
    </div>
  );
};

export default Card;