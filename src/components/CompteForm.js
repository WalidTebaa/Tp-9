import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
    // Initialisation de l'état pour stocker les données du formulaire
    const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        axios.post(`${API_BASE_URL}/comptes`, compte) // ⚠️ BACKTICKS ici, pas guillemets simples!
            .then(response => {
                alert('Compte ajouté');
                // Réinitialiser le formulaire après ajout
                setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
            })
            .catch(error => console.error(error)); // Gestion des erreurs
    };

    return (
        <div className="container mt-4">
            <h2>Ajouter un Compte</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Solde</label>
                    <input
                        type="number"
                        name="solde"
                        className="form-control"
                        value={compte.solde}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date de Création</label>
                    <input
                        type="date"
                        name="dateCreation"
                        className="form-control"
                        value={compte.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                        name="type"
                        className="form-select"
                        value={compte.type}
                        onChange={handleChange}
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default CompteForm;