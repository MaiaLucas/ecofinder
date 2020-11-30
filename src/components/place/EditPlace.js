import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import { FiPlus } from "react-icons/fi";
import "../../styles/pages/create-place.css";
import authService from "../../services/auth.service";
import Axios from "axios";
import API from "../../API";
import Alert from "@material-ui/lab/Alert";
import Sidebar from "../../templates/SideBar";
import { FiPlus } from "react-icons/fi";

export default () => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const [about, setAbout] = useState("");
	const [hr_init, setHrInit] = useState("");
	const [hr_final, setHrFinal] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [category, setCategory] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isCreatedClass, setIsCreatedClass] = useState("error");
	const [alertVisible, setAlertVisible] = useState("error");
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);

	useEffect(() => {
		(async () => {
			await authService.getCurrentUser().then((req, res) => {
				if (req.data) {
					const { id, token } = authService.userInfo();
					setUser({
						id,
						token,
					});
				}
			});
		})();
		return () => {};
	}, []);

	useEffect(() => {
		(async () => {
			await Axios.get(`${API}/place/${id}`).then((req) => {
				const place = { ...req.data };
				setName(place.title);
				setAbout(place.description);
				setCity(place.city);
				setState(place.state);
				setCategory(place.type);
				setAddress(place.address);
				setPhone(place.phone);
				setHrInit(place.hr_init);
				setHrFinal(place.hr_final);
				setOpenOnWeekends(place.opening_days !== "De Seg a Sex");
				setPreviewImages(place.images_url ? place.images_url.split(",") : []);
				setImages(place.images_url ? place.images_url.split(",") : []);
			});
		})();
		return () => {};
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();

		let opening_days = "De Seg a Sex";
		if (open_on_weekends) {
			opening_days = "Todos os dias";
		}

		// const data = {
		// 	title: name,
		// 	author: user.id,
		// 	description: about,
		// 	phone: phone,
		// 	city: city,
		// 	state: state,
		// 	address: address,
		// 	type: category,
		// 	hr_init: hr_init,
		// 	hr_final: hr_final,
		// 	opening_days: opening_days,
		// };
		let data = new FormData();
		data.append("title", name);
		data.append("author", user.id);
		data.append("description", about);
		data.append("phone", phone);
		data.append("city", city);
		data.append("state", state);
		data.append("address", address);
		data.append("type", category);
		data.append("hr_init", hr_init);
		data.append("hr_final", hr_final);
		data.append("opening_days", opening_days);

		if (images.length) {
			images.forEach((image) => {
				data.append("images", image);
			});
		}

		await Axios.put(`${API}/place/${id}`, data, {
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				authorization: `bearer ${user.token}`,
			},
		})
			.then((req, res) => {
				const { status, data } = req;
				const { message } = data;
				if (status === 200) {
					setSuccessMessage(message);
					setIsCreatedClass("success");
					setAlertVisible("visible");
				} else {
					setIsCreatedClass("error");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleSelectImages(event) {
		if (!event.target.files) return;

		const selectedImages = Array.from(event.target.files);

		setImages(selectedImages);

		const selectedImagesPreview = selectedImages.map((image) => {
			return URL.createObjectURL(image);
		});

		setPreviewImages(selectedImagesPreview);
	}

	return (
		<div id="page-create-place">
			<Sidebar />
			<main>
				<h1>Cadastro de Local</h1>
				<div className={`message ${alertVisible}`}>
					<Alert
						variant="filled"
						severity={isCreatedClass}
						onClose={() => {
							setAlertVisible("");
						}}
					>
						{successMessage}
					</Alert>
				</div>
				<form onSubmit={handleSubmit} className="create-place-form" noValidate>
					<fieldset className="d-flex flex-wrap">
						<legend>Dados</legend>

						<div className="input-block col-sm-8">
							<label htmlFor="name">Nome</label>
							<input
								required
								id="name"
								placeholder="Digite aqui o nome do local ou experiência"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="input-block col-sm-4">
							<label htmlFor="category">Categoria</label>
							<select
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="" disabled>
									Categoria
								</option>
								<option value="1">Ponto de Coleta</option>
								<option value="2">Experiência</option>
								<option value="3">Loja</option>
							</select>
						</div>

						<div className="input-block col-sm-12">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
							<textarea
								id="name"
								maxLength={300}
								placeholder="Digite aqui uma breve descrição"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">
								{previewImages.map((image) => {
									return <img key={image} src={image} alt={name} />;
								})}
								<label htmlFor="image[]" className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
							</div>
							<input
								required
								multiple
								onChange={handleSelectImages}
								type="file"
								id="image[]"
							/>
						</div>
					</fieldset>

					<fieldset className="d-flex flex-wrap">
						<legend>Localização</legend>
						<div className="input-block col-sm-3">
							<label htmlFor="state">Estado</label>
							<input
								required
								id="state"
								placeholder="Ex: Ceará"
								value={state}
								onChange={(e) => setState(e.target.value)}
							/>
						</div>

						<div className="input-block col-sm-3">
							<label htmlFor="city">Cidade</label>
							<input
								required
								id="city"
								placeholder="Ex: Fortaleza"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>

						<div className="input-block col-sm-6">
							<label htmlFor="address">Endereço</label>
							<input
								required
								id="address"
								placeholder="Ex: Rua dos Bobos, 0 - Bairro"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
					</fieldset>

					<fieldset className="d-flex flex-wrap">
						<legend>Informações Adicionais</legend>
						<div className="input-block col-sm-6">
							<label htmlFor="hr_final">Horário de funcionamento</label>
							<div className="button-select row">
								<input
									type="time"
									id="hr_init"
									value={hr_init}
									onChange={(e) => setHrInit(e.target.value)}
								/>
								<input
									id="hr_final"
									type="time"
									value={hr_final}
									onChange={(e) => setHrFinal(e.target.value)}
								/>
							</div>
						</div>

						<div className="input-block col-sm-6">
							<label htmlFor="open_on_weekends">Atende fim de semana</label>

							<div className="button-select">
								<button
									type="button"
									className={open_on_weekends ? "active" : ""}
									onClick={() => setOpenOnWeekends(true)}
								>
									Sim
								</button>
								<button
									type="button"
									className={!open_on_weekends ? "active" : ""}
									onClick={() => setOpenOnWeekends(false)}
								>
									Não
								</button>
							</div>
						</div>

						<div className="input-block">
							<label htmlFor="phone">Telefone para contato</label>
							<input
								required
								id="phone"
								placeholder="Ex: (85) 9 9999-9999"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
};
