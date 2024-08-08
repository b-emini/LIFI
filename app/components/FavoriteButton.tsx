interface FavoriteButtonProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
    classname?:string;
}

export default function FavoriteButton({ isFavorite, toggleFavorite, classname }: FavoriteButtonProps) {
    return (
        <button
            className={`${classname} button ${isFavorite ? 'button-red' : 'button-blue'} mt-4`}
            onClick={toggleFavorite}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}