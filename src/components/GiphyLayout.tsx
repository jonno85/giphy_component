import { FunctionComponent, useEffect, useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import MasonryLayout from './MasonryLayout';
import debounce from 'lodash.debounce';
import { Puff } from 'react-loader-spinner';

const gf = new GiphyFetch('D31L73ySufmBJ3YBDkmbVnH9TuWXuvMa');

export type GiphyLayoutProps = {
  words: string[];
  sizes: { columns: number; gutter: number };
};

const itemPerOffset = 5;
const gifIds: Set<string | number> = new Set();

const GiphyLayout: FunctionComponent<GiphyLayoutProps> = (props: GiphyLayoutProps) => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  window.onscroll = debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      const nextOffset = offset + itemPerOffset;
      setOffset(nextOffset);
    }
  }, 100);

  useEffect(() => {
    const combineSearch = async (offset: number, names: string[]) =>
      Promise.all(names.map((name) => gf.search(name, { offset, limit: itemPerOffset, rating: 'g' }))).then(
        (singleNameResult) =>
          singleNameResult.flatMap((element) => ({
            data: [...element.data],
            meta: element.meta,
            pagination: element.pagination,
          }))
      );
    const loadGyphs = async (offset: number, words: string[]) => {
      const data = await combineSearch(offset, words);

      const nextItems: JSX.Element[] = data.flatMap((gifResults) =>
        gifResults.data
          .filter((gif) => !gifIds.has(gif.id))
          .flatMap((gif) => {
            gifIds.add(gif.id);
            return <Gif gif={gif} key={`${Math.random()}`} width={gif.images.fixed_width.width} />;
          })
      );

      const shuffled: any = nextItems
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setTimeout(() => {
        setItems((prevArray) => [...prevArray, ...shuffled]);
        setLoading(false);
      }, 1000);
    };
    setLoading(true);
    loadGyphs(offset, props.words);

    // eslint-disable-next-line
  }, [offset]);

  return (
    <div id="outer">
      <div id="GiphyLayout" data-testid="GiphyLayoutContainer">
        <MasonryLayout sizes={props.sizes}>{items}</MasonryLayout>
      </div>

      {loading ? (
        <div id="spinner">
          <Puff color="#FFFFFF" height={200} width={200} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GiphyLayout;
