import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
    // Déclaration d'un état pour stocker les comptes
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utilisation de useEffect pour effectuer un appel à l'API dès le chargement
    useEffect(() => {
        axios.get(`${API_BASE_URL}/comptes`)
            .then(response => {
                setComptes(response.data); // Mise à jour de l'état avec les données récupérées
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Erreur lors du chargement des comptes');
                setLoading(false);
            }); // Gestion des erreurs
    }, []); // Le tableau vide indique que l'effet s'exécute uniquement au montage du composant

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Liste des Comptes</h2>
            {comptes.length === 0 ? (
                <div className="alert alert-info">Aucun compte trouvé</div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Solde</th>
                        <th>Date de Création</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comptes.map(compte => (
                        <tr key={compte.id}>
                            <td>{compte.id}</td>
                            <td>{compte.solde} DH</td>
                            <td>{new Date(compte.dateCreation).toLocaleDateString('fr-FR')}</td>
                            <td>
                                    <span className={`badge ${compte.type === 'COURANT' ? 'bg-primary' : 'bg-success'}`}>
                                        {compte.type}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CompteList;