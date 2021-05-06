import React, {useState} from 'react';
import Image from './Image'
import ImageModal from './ImageModal'

const ImageContainer = (props) =>{

    const [image, setImage] = useState(null)

    const {images, handleRemoveImage, format, handleDownload} = props;

    const onDelete = () =>{
        handleRemoveImage(image)
        setImage(null)
    }

    const onDownload = () => {
        handleDownload(image, 'react-photobooth' + format)
    }

    var imgs = images.length === 0 
    ? <p>No Media</p> 
    : images.map(x=>{
        return <Image src={x} key={x} setImage={setImage} handleRemoveImage={handleRemoveImage}/>
    })

    return <div className='imageContainer'>
    {imgs}
    <ImageModal 
            image={image} 
            setImage={setImage}
            onDelete={onDelete}
            onDownload={onDownload}
            visible={image}/>
    </div>
};

export default ImageContainer;