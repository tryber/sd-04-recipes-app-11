import drinkIcon from 'drinkIcon.svg';

const HeaderDrinks = (props) => {
  const { title } = props.return(
    <div>
      <h1>{title}</h1>
      <img src={drinkIcon} alt="drinkIcon" />
    </div>,
  );
};
