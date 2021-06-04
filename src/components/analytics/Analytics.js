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
import { logout } from "../../services/UserService";

export const Analytics = () => {

    const [isMonth, setIsMonth] = useState(false);
    const [data, setData] = useState();

    // const getAll = useCallback(() => {
    //     getAnalytics(1);
    // }, []);

    // useEffect(() => {
    //     getAll();
    // }, [getAll]);

    // async function getAnalytics(page) {
    //     try {
    //         const response = await getCustomers({ searchText, page });
    //         setTotal(response?.data?.total);
    //         setCustomers(response?.data?.customerList);
    //     } catch (error) {
    //         setError(error?.response?.data?.message);
    //     }
    // }

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
                    <button className="border-0 mx-3" onClick={logout}>Logout
          </button>
                </div>
            </div>
            {/* -----Summa-------- */}
            <div className="col-12 col-lg-9 d-flex justify-content-between mt-4 px-5">
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Total Leads</p>
                        <h4 className="analytics-title">358</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Demo</p>
                        <h4 className="analytics-title">45</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Interseted</p>
                        <h4 className="analytics-title">45</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">Qualified</p>
                        <h4 className="analytics-title">85</h4>
                    </div>
                </div>
                <div className="d-flex">
                    <img className="summa-icon" src={summa} alt="summa" />
                    <div className='ps-2'>
                        <p className="paragraph mb-0">UnQualified</p>
                        <h4 className="analytics-title">308</h4>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-lg-3">
                    <h4 className="analytics-title fw-bold ps-5">Leads</h4>
                    <PieChartGraph />
                    <PieChartGraph />
                </div>
                <div className="col-12 col-lg-9">
                    <div className="d-flex text-center justify-content-center">
                        <div className="btn-group" id="bar-graph-toggle" role="group" aria-label="Basic example">
                            <button onClick={() => setIsMonth(true)} type="button" className={`bar-chart-btn btn btn-outline-danger px-3  ${isMonth ? 'active' : ''}`}>Month</button>
                            <button onClick={() => setIsMonth(false)} type="button" className={`bar-chart-btn btn btn-outline-danger px-3 ${!isMonth ? 'active' : ''}`}>Year</button>
                        </div>
                    </div>
                    <BarChartGraph />
                </div>
            </div>
        </div>
    );
};


