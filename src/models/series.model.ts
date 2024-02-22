export interface SeriesModel {
  _id: string;
  name: string;
  language: string;
  genre: string;
  thumbnail: string;
  description: string;
  numberOfSeasons: number;
  seasons: {
    seasonNumber: number;
    episodes: {
      episodeNumber: number;
      title: string;
      video: string;
      description: string;
      duration: string;
    }[];
  }[];
}
