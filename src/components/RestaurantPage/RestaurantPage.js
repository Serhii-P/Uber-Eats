import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPageDetailsQuery } from '../../services';
import './RestaurantPage.scss';
import RestaurantPageSection from '../RestauratPageSection/RestauratPageSection';
import Loader from '../Loader/Loader';

const RestaurantPage = () => {
  const {id} = useParams();
  const { data, error, isLoading, isError } = useGetPageDetailsQuery(id);

    if(isLoading){
      return <Loader />
    }

    if(isError){
      return (<p>{JSON.stringify(error)}</p>)
    }

    const {title, heroImageUrls, categories, etaRange, location, sectionsMap, entitiesMap } = data.data;
    
    const categorySectionsRawData = Object.values(sectionsMap).map(section => {
      const categoryItemsIds = section.itemUuids.filter(itemId => {
        return Object.keys(entitiesMap).some(uuid => uuid === itemId )
      })

      const categoryItems = categoryItemsIds.map(itemId => entitiesMap[itemId])

      return {
        section,
        uuid: section.uuid,
        categoryItems
      }
    });

    const categorySectionsData = categorySectionsRawData.filter(category => 
      category.categoryItems.length > 0)

    const refs = categorySectionsData.reduce((acc, value) => {
      acc[value.section.uuid] = React.createRef();
      return acc;
    }, {});

    const handleNavLinkClick = (id) => {
      const element = refs[id].current;
      const elementTop = element.getBoundingClientRect().top
      const yOffset = -170;
      const windowYOffset = window.pageYOffset
      const y = elementTop + yOffset + windowYOffset;
      window.scrollTo({top: y, behavior: "smooth"})
    }

    const categoryCards = categorySectionsData.map(category => {
      return (
        <RestaurantPageSection
          section={category.section}
          fullSection={sectionsMap}
          key={category.uuid}
          categoryItems={category.categoryItems}
          refs={refs}
          id={category.uuid}
        />
      );
    });

    const categoriesList = categorySectionsData.map((category, id) => {
      return (
      <li key={id}>
        <button
          type="button"
          className="restaurant-page__navigation-link"
          onClick={() => handleNavLinkClick(category.uuid)}
        >
          {category.section.title.toLowerCase()}
        </button>
      </li>)
    });

    return (
      <>
        <section className="restaurant-page">
          <div className="restaurant-page__top-part">
            <div className="restaurant-page__img-wrapper">
              <img
                src={heroImageUrls[heroImageUrls.length-1].url}
                alt={title}
                className="restaurant-page__main-img"
              />
            </div>
            <div className="restaurant-page__rest-details">
              <h1 className="restaurant-page__main-title">
                {title}
              </h1>
              <p className="restaurant-page__description">
               {categories.join(' • ')}
              </p>
              <p className="restaurant-page__time">
                {etaRange ? etaRange.text : '35 - 45 min'}
              </p>
              <p className="restaurant-page__location">
                {location ? location.address : ''}
              </p>
            </div>
          </div>
             <div className="restaurant-page__main-content content">
             <nav className="restaurant-page__navigation-wrapper">
               <ul className="restaurant-page__navigation">
                  {categoriesList}
              </ul>
            </nav>
            <div className="restaurant-page__menu">
              {categoryCards}
            </div>
          </div>
        </section>
      </>
    );
}

export default RestaurantPage;



// -------------------------------------------------------------- //

// export class RestaurantPage extends React.Component {
//   state = {
//     activeSection: null,
//   }

// //   componentDidMount() {
// //     const {
// //       loadRestaurantInfo,
// //       match,
// //       loadLocationsVariants,
// //       locationsVariants,
// //     } = this.props;

// //     loadRestaurantInfo(match.params.id);

// //     window.scrollTo(0, 0);

// //     if (!locationsVariants) {
// //       loadLocationsVariants();
// //     }
// //   }

// //   handleNavLinkClick = (id) => {
// //     this.setState({
// //       activeSection: id,
// //     });
// //   }

//   render() {
//     const {
//       isLoading,
//       pageMainImgUrl,
//       pageFoodSections,
//       restaurantTitle,
//       restaurantAddress,
//       restaurantEtaRange,
//       restaurantCuisineList,
//     } = this.props;

//     const { activeSection } = this.state;

//     // if (isLoading) {
//     //   return <Loader />;
//     // }

//     return (
//       <section className="restaurant-page">
//         <div className="restaurant-page__top-part">
//           <div className="restaurant-page__img-wrapper">
//             <img
//               src={pageMainImgUrl}
//               alt=""
//               className="restaurant-page__main-img"
//             />
//           </div>
//           <div className="restaurant-page__rest-details">
//             <h1 className="restaurant-page__main-title">
//               {restaurantTitle}
//             </h1>
//             <p className="restaurant-page__description">
//               {/* {`£ • ${restaurantCuisineList.join(' • ')}`} */}
//             </p>
//             <p className="restaurant-page__time">
//               {restaurantEtaRange}
//             </p>
//             <p className="restaurant-page__location">
//               {restaurantAddress}
//             </p>
//           </div>
//         </div>

//         <div className="restaurant-page__main-content content">
//           <nav className="restaurant-page__navigation-wrapper">
//             <ul className="restaurant-page__navigation">
//               {/* {pageFoodSections.map(section => (
//                 <li key={section.title}>
//                   <button
//                     type="button"
//                     className="restaurant-page__navigation-link"
//                     onClick={() => this.handleNavLinkClick(section.uuid)}
//                   >
//                     {section
//                       .title.toLowerCase()}
//                   </button>
//                 </li>
//               ))} */}
//             </ul>
//           </nav>
//           {/* <div className="restaurant-page__menu">
//             {
//               pageFoodSections.map(section => (
//                 <RestaurantPageSection
//                   section={section}
//                   activeSection={activeSection}
//                   key={section.uuid}
//                 />
//               ))
//             }
//           </div> */}
//         </div>
//       </section>
//     );
//   }
// }
