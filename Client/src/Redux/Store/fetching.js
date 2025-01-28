import axios from 'axios';
import { getSkills, setLoading as setSkillsLoading, setError as setSkillsError } from '../Slice/skillSlice';
import { getProjects, setLoading as setProjectsLoading, setError as setProjectsError } from '../Slice/pojectSlice';
import { getProfile, setProfileLoading, setProfileError } from '../Slice/profileSlice';

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

export const fetchProfile = async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    console.log('fetchProfile');
    const response = await axios.get('http://localhost:5000/profile');
    console.log('response>>>>', response);
    if (response.data.profile) {
      dispatch(getProfile(response.data.profile));
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    dispatch(setProfileError(error.message));
  } finally {
    dispatch(setProfileLoading(false));
  }
};
