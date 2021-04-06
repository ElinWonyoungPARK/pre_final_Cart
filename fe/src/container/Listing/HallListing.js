import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';
import { Toolbar, CategorySearch, PostPlaceholder, SectionGrid, FilterDrawer } from 'components/index';
import { Checkbox } from 'antd';
import useWindowSize from 'library/hooks/useWindowSize';
import useDataApi from 'library/hooks/useDataApi';
import { EXHBN_DETAIL_PAGE } from 'settings/constant';
import ListingWrapper, { PostsWrapper } from 'container/Listing/Listing.style';
const HallListing = ({ location, history }) => {

  const [exhbn, setExhbn] = useState([])

  let url = '/data/hotel.json';
  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  const { data, loading, loadMoreData, total, limit } = useDataApi(`http://localhost:8080/exhbns`);
  let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];
  
  useEffect(() => {
    // alert(localStorage.getItem('exhbnTitle'))
    axios.get("http://localhost:8080/exhbns/search/"+localStorage.getItem('exhbnTitle'), 
    ).then(resp => {
      // alert(`성공`)
      setExhbn(resp.data)
    }).catch(err => {
      alert(`err`)
      throw err
    })
  }, [])

  return (
    <>
    <ListingWrapper>
      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
            width > 991 ? (
              <CategorySearch history={history} location={location} />
            ) : (
              <FilterDrawer history={history} location={location} />
            )
          }
        />
      </Sticky>

      <Fragment>
        <PostsWrapper className={width > 767 && showMap ? 'col-12' : 'col-24'}>
          <SectionGrid
            link={EXHBN_DETAIL_PAGE}
            columnWidth={columnWidth}
            data={data}
            totalItem={total.length}
            loading={loading}
            limit={limit}
            handleLoadMore={loadMoreData}
            placeholder={<PostPlaceholder />}
          />
        </PostsWrapper>

      </Fragment>
    </ListingWrapper>
    </>
  );
}
export default HallListing;