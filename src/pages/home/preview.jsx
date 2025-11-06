import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./preview.css";

function Preview({ tempoJunto, imagem, mensagem, video }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!imagem || imagem.length === 0) return;
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagem.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [imagem]);

  const FALLBACK_IMG =
    "https://placehold.co/300x400?text=Imagem+não+encontrada";

  const validImages =
    Array.isArray(imagem) && imagem.length > 0
      ? imagem.filter(
          (url) =>
            (url && typeof url === "string" && url.startsWith("http")) ||
            url.startsWith("blob:")
        )
      : [];

  const imgUrl =
    validImages.length > 0
      ? validImages[index % validImages.length]
      : FALLBACK_IMG;
  return (
    <div className="preview">
      <p>Josias 💘 Aby</p>
      {imagem && (
        <div className="image-container">
          <img
            src={imgUrl}
            alt="Prévia"
            onError={(e) => {
              console.warn("Erro ao carregar imagem:", e.target.src);
              if (e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
            }}
          />
        </div>
      )}

      <p>Juntos</p>
      <p>
        {tempoJunto.anos} anos, {tempoJunto.meses} meses, {tempoJunto.dias} dias
        <br />
        {tempoJunto.horas} horas, {tempoJunto.minutos} minutos,{" "}
        {tempoJunto.segundos} segundos
      </p>
      <p>----------------</p>

      <p>{mensagem}</p>

      {video && (
        <div style={{ marginTop: "30px" }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Preview;
