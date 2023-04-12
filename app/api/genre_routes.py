from app.models import Genre
from flask import Blueprint


genre_routes = Blueprint('genres',__name__)


@genre_routes.route('')
def get_all_genres():

    genres = Genre.query.all()

    genres_dict = {}

    for genre in genres:
        genres_dict[genre.name] = genre.to_dict()

    return genres_dict
