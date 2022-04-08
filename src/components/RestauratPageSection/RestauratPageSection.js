import { ItemCard } from '../ItemCard/ItemCrd';
import './RestauratPageSection.scss';
         
const RestauratPageSection = (props) => {
  const { section, categoryItems, refs, id } = props;
    
  if(categoryItems.length === 0) {
    return false;
  }           

  return (
    <div
      className="restaurant-page__menu-item"
      key={section.title}
      ref={refs[id]}
    >
      <h2
        className="restaurant-page__menu-item-title"
      >
        {section.title.toLowerCase()}
      </h2>
      <div className="restaurant-page__menu-container">
        {categoryItems.map(item => {
          const {title, description, price, imageUrl, uuid} = item;

          return (
            <ItemCard
              title={title}
              description={description}
              price={price}
              imgUrl={imageUrl}
              key={uuid}
              uuid={uuid}
            />
          );
        })}
      </div>
    </div>
    );
}

export default RestauratPageSection;
