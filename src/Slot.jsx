export default function Slot({ image }) {
    return (
        <div>
            {image && <img src={image} className="slot-image" width="100" height="100" />}
        </div>
    );
}