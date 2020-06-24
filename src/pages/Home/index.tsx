import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiBookmark } from 'react-icons/fi';

import { OwnerInfo, Projects } from './styles';
import profileImg from '../../assets/profile.jpeg';
import qrCodeImg from '../../assets/Iagho_Cristian_Chagas.png';
import config from '../../config/config';

import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    name: string;
    description: string;
    iconPath: string;
}

const Home: React.FC = () => {
    
    const [projects, setProjects] = useState<Project[]>([]);
    //const [certificateCount, setCertificateCount] = useState<Certificate[]>([]);

    useEffect(() => {
        api.get('/projects').then((result)=> {
            setProjects(result.data.projects);
        });
    }, []);

    /*useEffect(()=>{
        api.get('/certificates').then((result)=>{
            setCertificateCount(result.data.certificate);
        })
    },[]);
    */

    function formatDescription(description: string): string {
        if(description.length > 115){
            return description.substring(0,115) + '...';
        }
        return description;
    }

    return (
        <>
            <OwnerInfo>
                <header>
                    <img
                        src={profileImg}
                        alt="Iagho Cristian Chagas"
                    />
                    <div>
                        <strong>Iagho Cristian Chagas</strong>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book.</p>
                    </div>
                </header>
                <div>
                    <ul>
                        <li>
                            <strong>{projects.length}</strong>
                            <span>Projetos</span>
                        </li>
                        <li>
                            <strong>{0}</strong>
                            <span>Certificados</span>
                        </li>
                        <li>
                            <Link to="/certificates" data-tip="Ver certificados" >
                                <FiBookmark size={40} color="#242424" />
                            </Link>
                        </li>
                    </ul>
                    <img src={qrCodeImg} width={130} alt="Scan to linkedin"/>
                </div>
                
            </OwnerInfo>

            <Projects>
                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`}>
                        <div>
                            <div>
                                { project.iconPath && <img src={`${config.apiUrl}/icons/${project.iconPath}`} width={20} alt={project.name} /> }
                                <strong>{project.name}</strong>
                            </div>
                            <p>{formatDescription(project.description)}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Projects>
        </>
    );
};

export default Home;
