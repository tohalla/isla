package isla.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.StrictAssertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import isla.Application;
import isla.domain.Course;
import isla.domain.Lecture;
import isla.repository.CourseRepository;
import isla.repository.LectureRepository;
import isla.repository.search.CourseSearchRepository;


/**
 * Test class for the CourseResource REST controller.
 *
 * @see CourseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class CourseResourceTest {

    private static final String DEFAULT_COURSE_NAME = "AAAAA";
    private static final String UPDATED_COURSE_NAME = "BBBBB";
    private static final String DEFAULT_COURSE_DESCRIPTION = "AAAAA";
    private static final String UPDATED_COURSE_DESCRIPTION = "BBBBB";

    @Inject
    private CourseRepository courseRepository;

    @Inject
    private CourseSearchRepository courseSearchRepository;

    @Inject
    private LectureRepository lectureRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCourseMockMvc;

    private Course course;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CourseResource courseResource = new CourseResource();
        ReflectionTestUtils.setField(courseResource, "courseRepository", courseRepository);
        ReflectionTestUtils.setField(courseResource, "courseSearchRepository", courseSearchRepository);
        ReflectionTestUtils.setField(courseResource, "lectureRepository", lectureRepository);
        this.restCourseMockMvc = MockMvcBuilders.standaloneSetup(courseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        course = new Course();
        course.setCourseName(DEFAULT_COURSE_NAME);
        course.setCourseDescription(DEFAULT_COURSE_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCourse() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course

        restCourseMockMvc.perform(post("/api/courses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(course)))
                .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courses = courseRepository.findAll();
        assertThat(courses).hasSize(databaseSizeBeforeCreate + 1);
        Course testCourse = courses.get(courses.size() - 1);
        assertThat(testCourse.getCourseName()).isEqualTo(DEFAULT_COURSE_NAME);
        assertThat(testCourse.getCourseDescription()).isEqualTo(DEFAULT_COURSE_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllCourses() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get all the courses
        restCourseMockMvc.perform(get("/api/courses"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
                .andExpect(jsonPath("$.[*].courseName").value(hasItem(DEFAULT_COURSE_NAME.toString())))
                .andExpect(jsonPath("$.[*].courseDescription").value(hasItem(DEFAULT_COURSE_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(course.getId().intValue()))
            .andExpect(jsonPath("$.courseName").value(DEFAULT_COURSE_NAME.toString()))
            .andExpect(jsonPath("$.courseDescription").value(DEFAULT_COURSE_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

		int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Update the course
        course.setCourseName(UPDATED_COURSE_NAME);
        course.setCourseDescription(UPDATED_COURSE_DESCRIPTION);

        restCourseMockMvc.perform(put("/api/courses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(course)))
                .andExpect(status().isOk());

        // Validate the Course in the database
        List<Course> courses = courseRepository.findAll();
        assertThat(courses).hasSize(databaseSizeBeforeUpdate);
        Course testCourse = courses.get(courses.size() - 1);
        assertThat(testCourse.getCourseName()).isEqualTo(UPDATED_COURSE_NAME);
        assertThat(testCourse.getCourseDescription()).isEqualTo(UPDATED_COURSE_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

		int databaseSizeBeforeDelete = courseRepository.findAll().size();

        // Get the course
        restCourseMockMvc.perform(delete("/api/courses/{id}", course.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Course> courses = courseRepository.findAll();
        assertThat(courses).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void getAllLectures() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

		// Add two lectures
        Lecture lecture1 = new Lecture();
        lecture1.setDescription("eka luento");
        lecture1.setCreatedAt(DateTime.now());
        lecture1.setStartsAt(DateTime.now().plusHours(1));
        lecture1.setClosesAt(DateTime.now().plusHours(2).plusMinutes(30));
        lecture1.setCourse(course);
        lectureRepository.saveAndFlush(lecture1);

        Lecture lecture2 = new Lecture();
        lecture2.setDescription("toka luento");
        lecture2.setCreatedAt(DateTime.now());
        lecture2.setStartsAt(DateTime.now().plusDays(1).plusHours(1));
        lecture2.setClosesAt(DateTime.now().plusDays(1).plusHours(2).plusMinutes(30));
        lecture2.setCourse(course);
        lectureRepository.saveAndFlush(lecture2);

        // Get all lectures of course
        restCourseMockMvc.perform(get("/api/courses/{id}/lectures", course.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id").value(hasItem(lecture1.getId().intValue())))
                .andExpect(jsonPath("$.[*].id").value(hasItem(lecture2.getId().intValue())));
    }
}
