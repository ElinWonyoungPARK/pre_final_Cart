import React, { useState } from 'react';
import moment from 'moment';
import { Button, Slider, Checkbox } from 'antd';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import { setStateToUrl, getStateFromUrl } from 'components/Search/url_handler';
import {
  priceInit,
  calenderItem,
  getAmenities,
  getPropertyType,
} from 'components/Search/SearchParams';
import CategroySearchWrapper, {
  RoomGuestWrapper,
  ItemWrapper,
  ActionWrapper,
} from 'components/Search/CategorySearch/CategorySearch.style';

const CategorySearch = ({ history, location }) => {
  const searchParams = getStateFromUrl(location);
  const state = {
    amenities: searchParams.amenities || [],
    property: searchParams.property || [],
    date_range: searchParams.date_range || {
      setStartDate: null,
      setEndDate: null,
    },
    price: searchParams.price || {
      min: 0,
      max: 100,
      defaultMin: 0,
      defaultMax: 100,
    },
    location: searchParams.location || {
      lat: null,
      lng: null,
    },
    room: parseInt(searchParams.room) || 0,
    guest: parseInt(searchParams.guest) || 0,
  };
  const { amenities, property, date_range, price, room, guest } = state;
  const [countRoom, setRoom] = useState(room);
  const [countGuest, setGuest] = useState(guest);

  const onChange = (value, type) => {
    const query = {
      ...state,
      [type]: value,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestApply = () => {
    const query = {
      ...state,
      room: countRoom,
      guest: countGuest,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestCancel = () => {
    setRoom(0);
    setGuest(0);
    const query = {
      ...state,
      room: 0,
      guest: 0,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const onSearchReset = () => {
    setRoom(0);
    setGuest(0);
    const search = setStateToUrl({ reset: '' });
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={amenities.length ? 'activated' : ''}
        key={getAmenities.id}
        noView={true}
        view={
          <Button type="default">
            {getAmenities.name}
            {amenities.length > 0 && `: ${amenities.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getAmenities.options}
            defaultValue={amenities}
            onChange={(value) => onChange(value, 'amenities')}
          />
        }
      />

      <ViewWithPopup
        className={property.length ? 'activated' : ''}
        key={getPropertyType.id}
        noView={true}
        view={
          <Button type="default">
            {getPropertyType.name}
            {property.length > 0 && `: ${property.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={(value) => onChange(value, 'property')}
          />
        }
      />

      <ViewWithPopup
        className={
          Object.keys('date_range').length !== null &&
          date_range.setStartDate !== null
            ? 'activated'
            : ''
        }
        key={400}
        noView={true}
        view={<Button type="default">Choose Date</Button>}
      />

      <ViewWithPopup
        className={
          price.min === price.defaultMin && price.max === price.defaultMax
            ? ''
            : 'activated'
        }
        key={300}
        noView={true}
        view={
          <Button type="default">
            {price.min > 0 || price.max < 100
              ? `Price: ${price.min}, ${price.max}`
              : `Price per night`}
          </Button>
        }
        popup={
          <Slider
            range
            marks={priceInit}
            min={price.defaultMin}
            max={price.defaultMax}
            defaultValue={[price.min, price.max]}
            onAfterChange={(value) => onChange(value, 'price')}
          />
        }
      />

      <ViewWithPopup
        key={200}
        noView={true}
        className={countRoom || countGuest ? 'activated' : ''}
        view={
          <Button type="default">
            Room {countRoom > 0 && `: ${countRoom}`}, Guest
            {countGuest > 0 && `: ${countGuest}`}
          </Button>
        }
        popup={
          <RoomGuestWrapper>
            <ItemWrapper>
              <strong>Room</strong>
              <InputIncDec
                id="room"
                increment={() => setRoom((countRoom) => countRoom + 1)}
                decrement={() =>
                  setRoom((countRoom) => countRoom > 0 && countRoom - 1)
                }
                onChange={(e) => setRoom(e.target.value)}
                value={countRoom}
              />
            </ItemWrapper>

            <ItemWrapper>
              <strong>Guest</strong>
              <InputIncDec
                id="guest"
                increment={() => setGuest((countGuest) => countGuest + 1)}
                decrement={() =>
                  setGuest((countGuest) => countGuest > 0 && countGuest - 1)
                }
                onChange={(e) => setGuest(e.target.value)}
                value={countGuest}
              />
            </ItemWrapper>

            <ActionWrapper>
              {countRoom || countGuest ? (
                <Button type="default" onClick={e => handleRoomGuestCancel()}>
                  Clear
                </Button>
              ) : (
                ''
              )}
              <Button type="primary" onClick={e => handleRoomGuestApply()}>
                Apply
              </Button>
            </ActionWrapper>
          </RoomGuestWrapper>
        }
      />
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={e => onSearchReset()}>
            Reset
          </Button>
        </div>
      </div>
    </CategroySearchWrapper>
  );
};

export default CategorySearch;