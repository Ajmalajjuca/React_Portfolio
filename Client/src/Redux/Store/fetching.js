import axios from 'axios';
import { getSkills, setLoading as setSkillsLoading, setError as setSkillsError } from '../Slice/skillSlice';
import { getProjects, setLoading as setProjectsLoading, setError as setProjectsError } from '../Slice/pojectSlice';

export const fetchProjects = async (dispatch) => {
  dispatch(setProjectsLoading(true));
  try {
    console.log('fetchProjects');
    const res = await axios.get('http://localhost:5000/getProjects');
    dispatch(getProjects(res.data.projects));
  } catch (error) {
    dispatch(setProjectsError(error.message));
  } finally {
    dispatch(setProjectsLoading(false));
  }
};

export const fetchSkills = async (dispatch) => {
  dispatch(setSkillsLoading(true));
  try {
    const res = await axios.get('http://localhost:5000/getSkills');
    dispatch(getSkills(res.data.skills));
  } catch (error) {
    dispatch(setSkillsError(error.message));
  } finally {
    dispatch(setSkillsLoading(false));
  }
};