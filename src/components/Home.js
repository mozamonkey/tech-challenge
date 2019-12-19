import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Select from 'react-select'

import { FETCH_USER_ERROR, FETCH_USER_ALBUM_ERROR, FETCH_USER_ALBUM_PHOTOS_ERROR } from '../actions/types';
import { GetUsers, startFetchingUser, GetUserAlbum, startFetchingAlbum, GetUserAlbumPhotos, startFetchingAlbumPhotos } from '../actions/UserActions';

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.showLoading()
    this.props.getUsersCall()

    this.state = {
      selectedUserId: null,
      selectedAlbumId: null
    }
  }

  onChangeUser = (val) => {
    this.setState({
      selectedUserId: val.value
    }, () => {
      this.getUserAlbums()
    })
  }

  getUserAlbums = () => {
    if(!!this.state.selectedUserId === true) {
      this.props.showAlbumLoading()
      this.props.getUserAlbumsCall(this.state.selectedUserId)
    }
  }

  onSelectAlbum = (id) => {
    this.setState({
      selectedAlbumId: id
    }, () => {
      this.getAlbumsPhotos()
    })
  }

  getAlbumsPhotos = () => {
    if(!!this.state.selectedAlbumId === true) {
      this.props.showAlbumPhotosLoading()
      this.props.getUserAlbumsPhotosCall(this.state.selectedAlbumId)
    }
  }

  render() {
    let { fetching, userInfo, albumFetching, userAlbum, photosFetching, albumPhotos } = this.props.user
    let { selectedUserId }= this.state
    return (
      <div className="w3-container home">

        <div className="w3-padding-16">
          {fetching && 
            <div>loading...</div>
          }
          {userInfo.length > 0 &&
            <UserSelection userInfo={userInfo} _onChange={this.onChangeUser} />
          }
        </div>

        <div className="w3-padding-16">
          {albumFetching && 
            <div>loading...</div>
          }
          {userAlbum.length > 0 &&
            <UserAlbum albums={userAlbum} _onChange={this.onSelectAlbum} />
          }
        </div>

        <div className="w3-padding-16">
          {photosFetching && 
            <div>loading...</div>
          }
          {albumPhotos.length > 0 &&
            <AlbumPhotos photos={albumPhotos}/>
          }
        </div>
      </div>
    )
  }
}

const UserSelection = ({
userInfo,
_onChange,
}) => {
  const options = userInfo.map(user => {
    return {
      value: user.id,
      label: user.name
    }
  })
return (
  <Select 
    options={options}
    onChange={_onChange}  
  />
)
}

const UserAlbum = ({
  albums,
  _onChange
}) => (
  <div>
    {
      albums.map((album, index) => 
        <div key={`album-${index}`} className="w3-container w3-cell w3-mobile" onClick={()=> _onChange(album.id)}>
          <span>{album.title}</span>
        </div>
      )
    }
  </div>
)

const AlbumPhotos = ({
  photos
}) => (
  <div className={'gallery'}>
    {
      photos.map((photo, index) => 
        <div key={`photo-${index}`} className="w3-cell w3-mobile">
          <img src={photo.thumbnailUrl} />
        </div>
      )
    }
  </div>
)

function mapStateToProps(state) {
  return { 
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => {
      dispatch(startFetchingUser());
    },
    getUsersCall: () => {
      GetUsers()
        .then(result => {
          dispatch(result);
        })
      .catch(error => {
        dispatch({type: FETCH_USER_ERROR, payload: "Failed to fetch users"});
      });
    },
    showAlbumLoading: () => {
      dispatch(startFetchingAlbum());
    },
    getUserAlbumsCall: (userId) => {
      GetUserAlbum(userId)
        .then(result => {
          dispatch(result);
        })
      .catch(error => {
        dispatch({type: FETCH_USER_ALBUM_ERROR, payload: "Failed to fetch user Albums"});
      });
    },
    showAlbumPhotosLoading: () => {
      dispatch(startFetchingAlbumPhotos());
    },
    getUserAlbumsPhotosCall: (albumId) => {
      GetUserAlbumPhotos(albumId)
        .then(result => {
          dispatch(result);
        })
      .catch(error => {
        dispatch({type: FETCH_USER_ALBUM_PHOTOS_ERROR, payload: "Failed to fetch user albums photos"});
      });
    }
  };
};

Home = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

export default Home;