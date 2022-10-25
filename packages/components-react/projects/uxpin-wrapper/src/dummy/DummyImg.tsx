export type DummyImgProps = {
  src?: string;
  alt?: string;
};

export const DummyImg = (props: DummyImgProps): JSX.Element => {
  const {
    src = 'https://files.porsche.com/filestore/image/multimedia/none/992-gt3-modelimage-sideshot/model/765dfc51-51bc-11eb-80d1-005056bbdc38/porsche-model.png',
    alt = '',
  } = props;

  return <img src={src} alt={alt} />;
};
