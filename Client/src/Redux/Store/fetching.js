import axios from 'axios';
import { setLoading, setError, getProjects } from '../Slice/pojectSlice';

export const fetchProjects = async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log('fetchProjects');
      const res = await axios.get('http://localhost:3000/getProjects');
      dispatch(getProjects(res.data.projects));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };