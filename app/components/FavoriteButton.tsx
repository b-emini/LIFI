interface FavoriteButtonProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
}

export default function FavoriteButton({ isFavorite, toggleFavorite }: FavoriteButtonProps) {
    return (
        <button
            className={`button ${isFavorite ? 'button-red' : 'button-blue'} mt-4`}
            onClick={toggleFavorite}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}