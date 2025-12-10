import AlbumItem from './AlbumItem';
import classes from './AlbumList.module.css';

function AlbumList(props) {
  return (
    <ul className={classes.list}>
      {props.Albums.map((Album) => (
        <AlbumItem
          key={Album._id}
          id={Album.PhotoId}
          image={Album.image}
          title={Album.title}
          address={Album.address}
        />
      ))}
    </ul>
  );
}

export default AlbumList;
