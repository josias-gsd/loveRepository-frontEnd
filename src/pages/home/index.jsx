import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ReactIcon from "../../assets/react.svg"; // Renomeei pra evitar conflito com React
import Preview from "./preview.jsx";
import "./style.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [inputVideo, setInputVideo] = useState("");
  const [dataInicio, setData] = useState("");
  const [horaInicio, setHora] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [selectImg, setSelectImg] = useState([]);
  const [files, setFiles] = useState([]); // arquivos reais (upload)
  const [imagemActual, setimagemActual] = useState(0);
  const [imagem, setImagem] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [tempoJunto, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    if (dataInicio && horaInicio) {
      const intervalo = setInterval(() => {
        const dataDeInicio = new Date(`${dataInicio}T${horaInicio}:00`);
        const agora = new Date();
        const diferenca = agora.getTime() - dataDeInicio.getTime();

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
  }, [dataInicio, horaInicio]);
  useEffect(() => {
    const delay = setTimeout(() => setUrlVideo(inputVideo), 500);
    return () => clearTimeout(delay);
  }, [inputVideo]);
  // Efeito separado para rotação de imagens
  useEffect(() => {
    if (selectImg.length === 0) return;

    const intervaloImagens = setInterval(() => {
      setimagemActual(
        (indiceAnterior) => (indiceAnterior + 1) % selectImg.length
      );
    }, 3000); // Mudando para 3 segundos para dar tempo de ver cada imagem

    return () => clearInterval(intervaloImagens);
  }, [selectImg]);

  const mudancaData = (e) => setData(e.target.value);
  const mudancaHora = (e) => setHora(e.target.value);

  const mudancaImagens = (e) => {
    const arquivos = Array.from(e.target.files);
    if (arquivos && arquivos.length > 0) {
      const imagens = arquivos.slice(0, 3);
      const urlImagens = imagens.map((img) => URL.createObjectURL(img));
      setSelectImg(urlImagens);
      setFiles(arquivos);
      setimagemActual(0);
    }
  };

  const inputNome = useRef();
  const inputData = useRef();
  const inputHora = useRef();
  const inputTexto = useRef();
  const inputLink = useRef();

  async function getUsers() {
    const getUsuarios = await api.get("/ver");
    setUsers(getUsuarios.data);
  }

  const navigate = useNavigate();

  async function criar() {
    try {
      const formData = new FormData();
      formData.append("nome", inputNome.current.value);
      formData.append("data", inputData.current.value);
      formData.append("hora", inputHora.current.value);
      formData.append("texto", inputTexto.current.value);
      formData.append("link", inputLink.current.value);

      for (const file of files) {
        formData.append("photos", file);
      }

      const res = await api.post("/criar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/tela");
    } catch (err) {
      console.error("Erro ao criar:", err);
      alert("Erro ao enviar dados. Verifique o console para mais detalhes.");
    }
  }

  const videoIdMatch = urlVideo.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return (
    <div className="home-container">
      <form className="form-section">
        <h1>
          <img src={ReactIcon} alt="" /> LoveYuu <img src={ReactIcon} alt="" />
        </h1>

        <p>Nome do casal:</p>
        <input type="text" ref={inputNome} />

        <p>Início do relacionamento:</p>
        <input
          type="date"
          ref={inputData}
          value={dataInicio}
          onChange={mudancaData}
        />
        <input
          type="time"
          ref={inputHora}
          value={horaInicio}
          onChange={mudancaHora}
        />

        <p>Mensagem:</p>
        <textarea
          ref={inputTexto}
          onChange={(e) => setMensagem(e.target.value)}
        ></textarea>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={mudancaImagens}
        />

        <p>Música Youtube: (Opcional)</p>
        <input
          type="text"
          ref={inputLink}
          value={urlVideo}
          onChange={(e) => setInputVideo(e.target.value)}
        />

        <button type="button" onClick={criar}>
          Criar nosso Site
        </button>
      </form>

      <Preview
        tempoJunto={tempoJunto}
        imagem={selectImg[imagemActual]}
        mensagem={mensagem}
        video={videoId}
      />
    </div>
  );
}

export default Home;
