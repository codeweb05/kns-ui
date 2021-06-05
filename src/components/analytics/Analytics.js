import { useState, useCallback, useEffect } from 'react';
import './analytics.css'
import logo from '../../assets/man.png'
import summa from '../../assets/summa.png'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import BarChartGraph from './BarChart';
import PieChartGraph from './PieChart';
import { getName, isAdmin } from '../../utils/helper';
import { getAnalytics } from "../../services/UserService";
import Logout from "../Logout";

export const Analytics = () => {

    const [isMonth, setIsMonth] = useState(false);
    const [data, setData] = useState();

    const getAll = useCallback(() => {
        getAnalytic();
    }, []);

    useEffect(() => {
        getAll();
    }, [getAll]);

    async function getAnalytic() {
        try {
            const response = await getAnalytics();
            setData(response.data)
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    
    const { totalCounts, yearlyCounts, monthlyCounts } = data || {};
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between mt-5 px-5">
                <h4 className="analytics-title fw-bold">Analytics</h4>
                <div className="d-flex">
                    <div className="logo-wrapper-little me-3 rounded-circle d-flex justify-content-center align-items-center">
                        <img className='w-75' src={logo} alt="man" />
                    </div>
                    <div>
                        <h4 className="slots">{getName()}</h4>
                        <p className="paragraph">{isAdmin() ? 'Admin' : ''}</p>
                    </div>
                    <Logout />
                </div>
            </div>
            {/* -----Summa-------- */}
            <div className="col-12 col-lg-10 d-flex justify-content-between mt-4 px-5">
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Total Leads</p>
                        <h4 className="analytics-title">{totalCounts?.total || 0}</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Demo</p>
                        <h4 className="analytics-title">{totalCounts?.demo || 0}</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Interested</p>
                        <h4 className="analytics-title">{totalCounts?.interested || 0}</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Qualified</p>
                        <h4 className="analytics-title">{totalCounts?.qualified || 0}</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">UnQualified</p>
                        <h4 className="analytics-title">{totalCounts?.unqualified || 0}</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Contacted</p>
                        <h4 className="analytics-title">{totalCounts?.contacted || 0}</h4>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-lg-3">
                    <h4 className="analytics-title fw-bold ps-5">Leads</h4>
                    <PieChartGraph data={totalCounts} />
                </div>
                <div className="col-12 col-lg-9">
                    <div className="d-flex text-center justify-content-center">
                        <div className="btn-group" id="bar-graph-toggle" role="group" aria-label="Basic example">
                            <button onClick={() => setIsMonth(true)} type="button" className={`bar-chart-btn btn btn-outline-danger px-3  ${isMonth ? 'active' : ''}`}>Month</button>
                            <button onClick={() => setIsMonth(false)} type="button" className={`bar-chart-btn btn btn-outline-danger px-3 ${!isMonth ? 'active' : ''}`}>Year</button>
                        </div>
                    </div>
                    <BarChartGraph data={isMonth ? monthlyCounts : yearlyCounts} />
                </div>
            </div>
        </div>
    );
};


