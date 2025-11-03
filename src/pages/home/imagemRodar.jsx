function ImageRotator({ imagens, fallback }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!imagens?.length) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % imagens.length),
      3000
    );
    return () => clearInterval(timer);
  }, [imagens]);

  if (!imagens?.length) return <img src={fallback} alt="sem imagem" />;

  const imgUrl = imagens[index].replace(
    "/upload/",
    "/upload/w_400,f_auto,q_auto/"
  );
  return (
    <img
      src={imgUrl}
      alt="Prévia"
      loading="lazy"
      decoding="async"
      onError={(e) => (e.target.src = fallback)}
    />
  );
}
export default ImageRotator;
