import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preview from "./preview.jsx";
import api from "../../services/api";
import "./tela.css";

function extrairVideoId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function Tela() {
  const { id } = useParams(); // pega o id da URL
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempoJunto, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  // 🔹 Novo estado para as imagens
  const [imagens, setImagens] = useState([]);
  const [imagemAtual, setImagemAtual] = useState(0);

  // 🔹 Buscar dados do backend

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();
      try {
        const endpoint = id ? `/ver/${id}` : "/ver"; // 🔹 se tiver id, busca um só
        const res = await api.get(endpoint);
        console.log(
          `⏱️ Tempo total front (GET /ver): ${performance.now() - start} ms`
        );
        if (res.data && res.data.length > 0) {
          // procura o primeiro registro (mais recente) com imagens
          const ultimoComFotos = res.data.find(
            (item) => Array.isArray(item.photos) && item.photos.length > 0
          );
          setEntry(ultimoComFotos || res.data[0]);
        } else {
          setEntry(null);
        }

        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  // 🔹 Rotação automática de imagens
  useEffect(() => {
    if (imagens.length === 0) return;
    const intervalo = setInterval(() => {
      setImagemAtual((anterior) => (anterior + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [imagens]);
  // 🔹 Calcular o tempo desde data/hora do banco
  useEffect(() => {
    if (entry?.data && entry?.hora) {
      const intervalo = setInterval(() => {
        const dataDeInicio = new Date(`${entry.data}T${entry.hora}:00`);
        const agora = new Date();
        const diferenca = agora - dataDeInicio;

        const segundos = Math.floor(diferenca / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const meses = Math.floor(dias / 30);
        const anos = Math.floor(meses / 12);

        setTempo({
          anos,
          meses: meses % 12,
          dias: dias % 30,
          horas: horas % 24,
          minutos: minutos % 60,
          segundos: segundos % 60,
        });
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [entry]);

  if (loading)
    return <div className="loading-error">Carregando a Surpresa❤...</div>;
  if (error)
    return <div className="loading-error">Erro ao carregar dados.</div>;
  if (!entry)
    return <div className="loading-error">Nenhum dado encontrado.</div>;

  return (
    <div className="tela-container">
      <Preview
        tempoJunto={tempoJunto}
        imagem={entry.photos} // agora é array de URLs
        video={extrairVideoId(entry.link)}
        mensagem={entry.texto}
      />
    </div>
  );
}
