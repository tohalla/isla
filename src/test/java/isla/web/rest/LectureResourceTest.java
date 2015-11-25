package isla.web.rest;

import isla.Application;
import isla.domain.Lecture;
import isla.repository.LectureRepository;
import isla.repository.search.LectureSearchRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the LectureResource REST controller.
 *
 * @see LectureResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class LectureResourceTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");


    private static final DateTime DEFAULT_CREATED_AT = new DateTime(0L, DateTimeZone.UTC);
    private static final DateTime UPDATED_CREATED_AT = new DateTime(DateTimeZone.UTC).withMillisOfSecond(0);
    private static final String DEFAULT_CREATED_AT_STR = dateTimeFormatter.print(DEFAULT_CREATED_AT);

    private static final DateTime DEFAULT_STARTS_AT = new DateTime(0L, DateTimeZone.UTC);
    private static final DateTime UPDATED_STARTS_AT = new DateTime(DateTimeZone.UTC).withMillisOfSecond(0);
    private static final String DEFAULT_STARTS_AT_STR = dateTimeFormatter.print(DEFAULT_STARTS_AT);

    private static final DateTime DEFAULT_CLOSES_AT = new DateTime(0L, DateTimeZone.UTC);
    private static final DateTime UPDATED_CLOSES_AT = new DateTime(DateTimeZone.UTC).withMillisOfSecond(0);
    private static final String DEFAULT_CLOSES_AT_STR = dateTimeFormatter.print(DEFAULT_CLOSES_AT);
    private static final String DEFAULT_DESCRIPTION = "SAMPLE_TEXT";
    private static final String UPDATED_DESCRIPTION = "UPDATED_TEXT";

    @Inject
    private LectureRepository lectureRepository;

    @Inject
    private LectureSearchRepository lectureSearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restLectureMockMvc;

    private Lecture lecture;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LectureResource lectureResource = new LectureResource();
        ReflectionTestUtils.setField(lectureResource, "lectureRepository", lectureRepository);
        ReflectionTestUtils.setField(lectureResource, "lectureSearchRepository", lectureSearchRepository);
        this.restLectureMockMvc = MockMvcBuilders.standaloneSetup(lectureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        lecture = new Lecture();
        lecture.setCreatedAt(DEFAULT_CREATED_AT);
        lecture.setStartsAt(DEFAULT_STARTS_AT);
        lecture.setClosesAt(DEFAULT_CLOSES_AT);
        lecture.setDescription(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createLecture() throws Exception {
        int databaseSizeBeforeCreate = lectureRepository.findAll().size();

        // Create the Lecture

        restLectureMockMvc.perform(post("/api/lectures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(lecture)))
                .andExpect(status().isCreated());

        // Validate the Lecture in the database
        List<Lecture> lectures = lectureRepository.findAll();
        assertThat(lectures).hasSize(databaseSizeBeforeCreate + 1);
        Lecture testLecture = lectures.get(lectures.size() - 1);
        assertThat(testLecture.getCreatedAt().toDateTime(DateTimeZone.UTC)).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testLecture.getStartsAt().toDateTime(DateTimeZone.UTC)).isEqualTo(DEFAULT_STARTS_AT);
        assertThat(testLecture.getClosesAt().toDateTime(DateTimeZone.UTC)).isEqualTo(DEFAULT_CLOSES_AT);
        assertThat(testLecture.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = lectureRepository.findAll().size();
        // set the field null
        lecture.setDescription(null);

        // Create the Lecture, which fails.

        restLectureMockMvc.perform(post("/api/lectures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(lecture)))
                .andExpect(status().isBadRequest());

        List<Lecture> lectures = lectureRepository.findAll();
        assertThat(lectures).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLectures() throws Exception {
        // Initialize the database
        lectureRepository.saveAndFlush(lecture);

        // Get all the lectures
        restLectureMockMvc.perform(get("/api/lectures"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(lecture.getId().intValue())))
                .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT_STR)))
                .andExpect(jsonPath("$.[*].startsAt").value(hasItem(DEFAULT_STARTS_AT_STR)))
                .andExpect(jsonPath("$.[*].closesAt").value(hasItem(DEFAULT_CLOSES_AT_STR)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getLecture() throws Exception {
        // Initialize the database
        lectureRepository.saveAndFlush(lecture);

        // Get the lecture
        restLectureMockMvc.perform(get("/api/lectures/{id}", lecture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(lecture.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT_STR))
            .andExpect(jsonPath("$.startsAt").value(DEFAULT_STARTS_AT_STR))
            .andExpect(jsonPath("$.closesAt").value(DEFAULT_CLOSES_AT_STR))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLecture() throws Exception {
        // Get the lecture
        restLectureMockMvc.perform(get("/api/lectures/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLecture() throws Exception {
        // Initialize the database
        lectureRepository.saveAndFlush(lecture);

		int databaseSizeBeforeUpdate = lectureRepository.findAll().size();

        // Update the lecture
        lecture.setCreatedAt(UPDATED_CREATED_AT);
        lecture.setStartsAt(UPDATED_STARTS_AT);
        lecture.setClosesAt(UPDATED_CLOSES_AT);
        lecture.setDescription(UPDATED_DESCRIPTION);
        

        restLectureMockMvc.perform(put("/api/lectures")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(lecture)))
                .andExpect(status().isOk());

        // Validate the Lecture in the database
        List<Lecture> lectures = lectureRepository.findAll();
        assertThat(lectures).hasSize(databaseSizeBeforeUpdate);
        Lecture testLecture = lectures.get(lectures.size() - 1);
        assertThat(testLecture.getCreatedAt().toDateTime(DateTimeZone.UTC)).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testLecture.getStartsAt().toDateTime(DateTimeZone.UTC)).isEqualTo(UPDATED_STARTS_AT);
        assertThat(testLecture.getClosesAt().toDateTime(DateTimeZone.UTC)).isEqualTo(UPDATED_CLOSES_AT);
        assertThat(testLecture.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteLecture() throws Exception {
        // Initialize the database
        lectureRepository.saveAndFlush(lecture);

		int databaseSizeBeforeDelete = lectureRepository.findAll().size();

        // Get the lecture
        restLectureMockMvc.perform(delete("/api/lectures/{id}", lecture.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Lecture> lectures = lectureRepository.findAll();
        assertThat(lectures).hasSize(databaseSizeBeforeDelete - 1);
    }
}
