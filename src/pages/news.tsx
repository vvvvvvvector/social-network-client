import { NextPageWithLayout } from './_app';

import { Main } from '@/layouts/Main';

import { Authorized } from '@/layouts/Authorised';

const News: NextPageWithLayout = () => {
  return <div className='bg-white p-5 rounded-lg'>News</div>;
};

News.getLayout = (page) => (
  <Main title='Authorised / News'>
    <Authorized>{page}</Authorized>
  </Main>
);

export default News;