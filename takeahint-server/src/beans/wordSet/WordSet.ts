import Association from './Association';

export default class WordSet {
  public words: Array<string> = [];
  public vote: Array<number> = [];
  public associations: Map<String, Association> = new Map<String, Association>();
}
