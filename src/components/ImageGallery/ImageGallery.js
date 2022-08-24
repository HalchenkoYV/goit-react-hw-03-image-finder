import './ImageGallery.module.css';
import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ImageGalleryItems from 'components/ImageGalleryItems/ImageGalleryItems';
import getPics from 'components/api-service(only-get)/api-service';



const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};


class ImageGallery extends Component {
    state = {
        responseWithPics: [],
        status: Status.IDLE,
        loadMore: false,
        error: null,
        currentPage: 1,
        toggleModal: false,
        highQualityPic:null,
    };

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.setState({ toggleModal:false });
            };
        });
        
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.setState({ toggleModal:false });
            };
        });
  }

    
     componentDidUpdate(prevProps, prevState) {
        const prevSearchTarget = prevProps.searchTarget;
        const nextSearchTarget = this.props.searchTarget;

         if (prevSearchTarget !== nextSearchTarget) {
            this.resetForm(); 
            this.setState({ status: Status.PENDING, loadMore: false });
             setTimeout(() => {
                this.takePics();
        }, 1000);
        };
    };

    async takePics ()  {
        const { currentPage } = this.state;
        const { searchTarget } = this.props;
        
    
        try {
            const { data } = await getPics.fetchPics(searchTarget, currentPage);
            this.setState(prevState=>
                ({
                    responseWithPics: [...prevState.responseWithPics, ...data.hits],
                    status: Status.RESOLVED,
                    currentPage: prevState.currentPage + 1 
                }));
            if (data.totalHits > 12) {
                    this.setState({ loadMore: true });
                };
        }
        catch (error) {
            console.log(12345)
                this.setState({ error:error, status: Status.REJECTED });
            };
    }
    
    clickOnMore = () => {
        this.setState({ status: Status.PENDING, loadMore: false });
        setTimeout(() => {
                this.takePics();
        }, 1000);
    };

    clickOnPic = (highQualityPic) => {
        console.log(highQualityPic);
        this.setState({ toggleModal: !this.state.toggleModal,highQualityPic:highQualityPic });
    }

    toggleModal = () => {
        this.setState({ toggleModal: !this.state.toggleModal });
            console.log(123);
    }

    resetForm() {
        this.setState({
            responseWithPics: [],
            status: Status.IDLE,
            loadMore: false,
            error: null,
            currentPage: 1,
        });
    };

    
    render() {
        const { loadMore, responseWithPics, status,toggleModal,highQualityPic } = this.state;
        // console.log(responseWithPics);

            return (
                <div>
                    <ImageGalleryItems responseWithPics={responseWithPics} onClick={this.clickOnPic}/>
                    
                    {loadMore && <Button onClick={this.clickOnMore} />}
                    {(status === 'pending') && (<Spinner animation="grow" />)}
                    {(status === 'rejected') && (<Alert  variant={'danger'}>Something went wrong</Alert>)}
                    {toggleModal && <Modal highQualityPic={ highQualityPic } onClick={this.toggleModal}/>} 
            </div>);
        


        
    };
};

export default ImageGallery;