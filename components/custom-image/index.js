import Image from 'react-bootstrap/Image';

function CustomImage({ src ,...props}){
    return (
        <Image src={src} {...props} />
    );
}

export default CustomImage;
