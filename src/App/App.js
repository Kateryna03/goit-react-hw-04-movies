import { Fragment } from 'react';
import { useState, useEffect } from 'react';
//import shortid from 'shortid';
//import './App.css';
//import fetchImages from '../services/Api';
import * as Api from '../services/Api';
import Searchbar from '../components/Searchbar';
//import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Button from '../components/Button/Button';
import LoaderComp from '../components/Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  // state = {
  //   //showModal: false,
  //   request: '',
  //   page: 1,
  //   images: [],
  //   isLoading: false,
  //   status: Status.IDLE,
  //   error: null,
  // };
  useEffect(() => {
    if (request) {
      pageRender();
    }
    // eslint-disable-next-line???
  }, [request]);
  // componentDidUpdate(prevProps, prevState) {
  //   const prev = prevState.request;
  //   const next = request;

  //   // if (this.state.page >= 2) {
  //   //   //console.log(this.state.page);
  //   //   this.scrollOnLoadButton();
  //   // }

  //   if (prev !== next) {
  //     pageRender();
  //   }
  // }

  //плавная прокрутка изображений
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   console.log();
  const pageRender = () => {
    setIsLoading(true);

    Api.fetchImages(request, page)
      .then(({ data }) => {
        if (data.hits.length === 0) {
          console.log(data);
          setStatus(Status.IDLE);
          toast.error('No result were found for your search');
          return;
        }
        setImages([...images, ...data.hits]);
        setPage(prevState => prevState + 1);
        setStatus(Status.RESOLVED);

        // this.setState(prevState => ({
        //   images: [...prevState.images, ...data.hits],
        //   page: prevState.page + 1,
        //   status: Status.RESOLVED,
        // }));
      })
      // .catch(error => this.setState({ error, status: Status.REJECTED }))
      .catch(error => {
        setError({ error });
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        // this.setState({ status: Status.RESOLVED, isLoading: false }),
        setStatus(Status.RESOLVED);
        setIsLoading(false);
      });
  };
  // }, [page, request, images, status, isLoading]);

  const handleFormSubmit = newRequest => {
    //this.setState({ request: newRequest, page: 1, images: [] });
    setRequest(newRequest);
    setPage(1);
    setImages([]);

    //setIsLoading(false);
  };

  // console.log("App render");
  // const { error, status, images } = this.state;

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer />
      </>
    );
  }

  if (status === Status.PENDING) {
    return <LoaderComp></LoaderComp>;
  }

  if (status === Status.REJECTED) {
    //console.log(error);
    return <ErrorMessage message={error} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <Fragment>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer />
        <ImageGallery images={images} isLoading={isLoading} />
        {images.length > 12 && scrollOnLoadButton()}
        {images.length > 0 && <Button OnClick={pageRender}></Button>}
      </Fragment>
    );
  }
}

export default App;
/////////////////////////////CLASS/////////////////////////////////////////////////
// import React, { Component, Fragment } from 'react';
// //import shortid from 'shortid';
// //import './App.css';
// import * as Api from '../services/Api';
// import Searchbar from '../components/Searchbar';
// //import Modal from '../components/Modal';
// import ImageGallery from '../components/ImageGallery';
// import { ToastContainer, toast } from 'react-toastify';
// import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
// import Button from '../components/Button/Button';
// import LoaderComp from '../components/Loader/Loader';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// class App extends Component {
//   state = {
//     //showModal: false,
//     request: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     status: Status.IDLE,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prev = prevState.request;
//     const next = this.state.request;

//     if (prev !== next) {
//       this.pageRender();
//     }
//   }

//   //плавная прокрутка изображений
//   scrollOnLoadButton = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   pageRender = () => {
//     const { request, page } = this.state;
//     this.setState({ isLoading: true });
//     Api.fetchImages(request, page)
//       .then(({ data }) => {
//         if (data.hits.length === 0) {
//           console.log({ data });
//           this.setState({ status: Status.IDLE });
//           toast.error('No result were found for your search');
//           return;
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.hits],
//           page: prevState.page + 1,
//           status: Status.RESOLVED,
//         }));
//         if (page !== 1) {
//           //console.log('_________--------');
//           this.scrollOnLoadButton();
//         }
//       })
//       .catch(error => this.setState({ error, status: Status.REJECTED }))
//       .finally(() =>
//         this.setState({ status: Status.RESOLVED, isLoading: false }),
//       );
//   };

//   handleFormSubmit = newRequest => {
//     this.setState({ request: newRequest, page: 1, images: [] });
//   };

//   render() {
//     // console.log("App render");
//     const { error, status, images } = this.state;

//     if (status === Status.IDLE) {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ToastContainer />
//         </>
//       );
//     }

//     if (status === Status.PENDING) {
//       return <LoaderComp></LoaderComp>;
//     }

//     if (status === Status.REJECTED) {
//       //console.log(error);
//       return <ErrorMessage message={error} />;
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <Fragment>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ToastContainer />
//           <ImageGallery images={images} />
//           {/* {images.length > 12 && console.log("вызвался скролл__________",this.scrollOnLoadButton())
//           } */}
//           {images.length >= 12 && <Button OnClick={this.pageRender}></Button>}
//         </Fragment>
//       );
//     }
//   }
// }

// export default App;
