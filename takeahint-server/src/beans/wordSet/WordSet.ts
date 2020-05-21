import Association from './Association';

export default class WordSet {
  public words: Array<string> = [];
  public vote: Map<String, number> = new Map<String, number>();
  public associations: Map<String, Association> = new Map<String, Association>();
}
