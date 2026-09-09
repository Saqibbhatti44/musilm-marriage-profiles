/* =========================================================
   AL-NIKAH MATRIMONIAL — MAIN JS
   Handles: mobile nav active state, back-to-top,
   dummy profile data + listing filters, contact form UX.
   NOTE: Profile data below is DUMMY/STATIC for the HTML
   prototype only. In WordPress this will be replaced by a
   Custom Post Type "Marriage Profiles" queried via WP_Query,
   with taxonomies for Gender, Country, City, Education,
   Profession and Marital Status, and ACF Pro fields for the
   detail page sections.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact / Enquiry form (front-end only demo) ---------- */
  var forms = document.querySelectorAll('.js-demo-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = form.parentElement.querySelector('.js-form-success');
      form.reset();
      form.classList.add('d-none');
      if (successBox) successBox.classList.remove('d-none');
    });
  });

  /* ---------- Init profile listing (if present on page) ---------- */
  if (document.getElementById('profilesGrid')) {
    initProfileListing();
  }

  /* ---------- Init single profile detail (if present) ---------- */
  if (document.getElementById('profileDetailRoot')) {
    initProfileDetail();
  }

  /* ---------- Init featured profiles on homepage ---------- */
  if (document.getElementById('featuredProfilesGrid')) {
    renderFeaturedProfiles();
  }
});


/* =========================================================
   DUMMY PROFILE DATA (8 realistic fictional profiles)
   ========================================================= */
var MATRIMONIAL_PROFILES = [
  {
    id: "MP-1025",
    name: "Muhammad Ahmed",
    gender: "Male",
    age: 29,
    city: "Karachi",
    country: "Pakistan",
    education: "Master's Degree",
    educationLevel: "Masters",
    profession: "Software Engineer",
    maritalStatus: "Never Married",
    height: "5'10\"",
    nationality: "Pakistani",
    photo: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=750&fit=crop",
    familyBackground: "A well-settled, religious middle-class family based in Karachi. Father is a retired government officer and mother is a homemaker.",
    fatherOccupation: "Retired Government Officer",
    motherOccupation: "Homemaker",
    siblings: "2 (1 married sister, 1 younger brother)",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing, prays five times daily",
    about: "I am a software engineer working at a reputed multinational company in Karachi. I lead a balanced life between my career and faith, and I'm looking for a life partner who values honesty, family and Deen. I enjoy reading, travelling and spending quiet evenings with family.",
    partnerAge: "23 - 28 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "Pakistan (Karachi preferred)",
    partnerOther: "Should be practicing, family-oriented and supportive of a working lifestyle.",
    income: "Prefer not to disclose"
  },
  {
    id: "MP-1032",
    name: "Ayesha Siddiqui",
    gender: "Female",
    age: 25,
    city: "Lahore",
    country: "Pakistan",
    education: "Bachelor's Degree",
    educationLevel: "Bachelors",
    profession: "School Teacher",
    maritalStatus: "Never Married",
    height: "5'4\"",
    nationality: "Pakistani",
    photo: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=600&h=750&fit=crop",
    familyBackground: "A respected and religious family in Lahore. Father runs a small business and mother is a homemaker. Raised with strong Islamic values.",
    fatherOccupation: "Businessman",
    motherOccupation: "Homemaker",
    siblings: "3 (1 elder brother, 2 younger sisters)",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing, observes Hijab",
    about: "I am a school teacher who loves working with children and believes in raising the next generation with strong values. I come from a loving, close-knit family and I am looking for a caring, practicing partner who respects family bonds and shares similar values.",
    partnerAge: "26 - 32 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "Pakistan",
    partnerOther: "A practicing Muslim with a stable profession and good family values.",
    income: "N/A"
  },
  {
    id: "MP-1041",
    name: "Bilal Hussain",
    gender: "Male",
    age: 32,
    city: "Dubai",
    country: "United Arab Emirates",
    education: "Bachelor's Degree",
    educationLevel: "Bachelors",
    profession: "Business Owner",
    maritalStatus: "Divorced",
    height: "5'11\"",
    nationality: "Pakistani",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop",
    familyBackground: "Originally from Islamabad, currently settled in Dubai for business. Family is religious and well-respected in the community.",
    fatherOccupation: "Businessman",
    motherOccupation: "Homemaker",
    siblings: "1 younger brother",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing",
    about: "I run my own trading business in Dubai and have been based here for the past 6 years. I was previously married; the marriage ended amicably due to compatibility issues. I am now looking to settle down with someone mature, understanding and family-oriented.",
    partnerAge: "26 - 33 years",
    partnerEducation: "Any",
    partnerLocation: "UAE or Pakistan, open to relocation",
    partnerOther: "Open to a divorced or widowed match with or without children.",
    income: "Prefer not to disclose"
  },
  {
    id: "MP-1058",
    name: "Fatima Rahman",
    gender: "Female",
    age: 28,
    city: "Dhaka",
    country: "Bangladesh",
    education: "Master's Degree",
    educationLevel: "Masters",
    profession: "Doctor (Physician)",
    maritalStatus: "Never Married",
    height: "5'5\"",
    nationality: "Bangladeshi",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop",
    familyBackground: "A highly educated family from Dhaka. Father is a retired professor and mother is a former school principal.",
    fatherOccupation: "Retired Professor",
    motherOccupation: "Retired School Principal",
    siblings: "1 elder brother (married)",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing",
    about: "I work as a physician at a government hospital in Dhaka. Balancing my profession with my faith is important to me, and I hope to find a partner who is respectful, kind and shares a similar outlook on life and family responsibilities.",
    partnerAge: "29 - 35 years",
    partnerEducation: "Master's or professional degree preferred",
    partnerLocation: "Bangladesh or abroad",
    partnerOther: "Should be supportive of my career and value education highly.",
    income: "N/A"
  },
  {
    id: "MP-1063",
    name: "Omar Farooq",
    gender: "Male",
    age: 35,
    city: "Manchester",
    country: "United Kingdom",
    education: "PhD",
    educationLevel: "PhD",
    profession: "University Lecturer",
    maritalStatus: "Never Married",
    height: "6'0\"",
    nationality: "British Pakistani",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop",
    familyBackground: "Second-generation British Pakistani family, originally from Gujranwala. Family is religious and highly values education.",
    fatherOccupation: "Retired Engineer",
    motherOccupation: "Homemaker",
    siblings: "2 sisters (both married)",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing",
    about: "I am a university lecturer specialising in engineering, based in Manchester. I was raised with a strong connection to my faith and culture despite growing up in the UK. I am seeking a well-educated, practicing partner who is open to settling in the UK.",
    partnerAge: "27 - 33 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "UK preferred, open to Pakistan",
    partnerOther: "Someone family-oriented, willing to relocate to the UK.",
    income: "Prefer not to disclose"
  },
  {
    id: "MP-1071",
    name: "Zainab Malik",
    gender: "Female",
    age: 31,
    city: "Islamabad",
    country: "Pakistan",
    education: "Master's Degree",
    educationLevel: "Masters",
    profession: "Bank Manager",
    maritalStatus: "Widowed",
    height: "5'6\"",
    nationality: "Pakistani",
    photo: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=600&h=750&fit=crop",
    familyBackground: "A respected family settled in Islamabad. Father served in the armed forces; mother is a homemaker.",
    fatherOccupation: "Retired Army Officer",
    motherOccupation: "Homemaker",
    siblings: "2 younger brothers",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing",
    about: "I currently work as a bank manager in Islamabad. I was widowed three years ago and have since focused on my career and my one child. I am looking for a mature, understanding and responsible partner who values family life and is ready to embrace a ready-made family with warmth.",
    partnerAge: "32 - 40 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "Pakistan",
    partnerOther: "Should be accepting of a child from a previous marriage.",
    income: "N/A"
  },
  {
    id: "MP-1079",
    name: "Hamza Khan",
    gender: "Male",
    age: 27,
    city: "Toronto",
    country: "Canada",
    education: "Bachelor's Degree",
    educationLevel: "Bachelors",
    profession: "Civil Engineer",
    maritalStatus: "Never Married",
    height: "5'9\"",
    nationality: "Canadian Pakistani",
    photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=750&fit=crop",
    familyBackground: "Family migrated to Canada 15 years ago from Faisalabad. Close-knit family that maintains strong ties to faith and culture.",
    fatherOccupation: "Small Business Owner",
    motherOccupation: "Homemaker",
    siblings: "1 younger sister",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing",
    about: "I work as a civil engineer in Toronto and am actively involved in my local Islamic community centre. I am looking for a practicing partner, whether based in Canada or willing to relocate, who values a balanced life between faith, family and career.",
    partnerAge: "23 - 29 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "Canada or Pakistan (open to relocation)",
    partnerOther: "Family-oriented and practicing, comfortable with life abroad.",
    income: "Prefer not to disclose"
  },
  {
    id: "MP-1088",
    name: "Maryam Iqbal",
    gender: "Female",
    age: 24,
    city: "Jeddah",
    country: "Saudi Arabia",
    education: "Bachelor's Degree",
    educationLevel: "Bachelors",
    profession: "Graphic Designer",
    maritalStatus: "Never Married",
    height: "5'3\"",
    nationality: "Pakistani",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=750&fit=crop",
    familyBackground: "Pakistani expatriate family settled in Jeddah for over 20 years. Father works in a private company, family is devout and community-oriented.",
    fatherOccupation: "Company Manager",
    motherOccupation: "Homemaker",
    siblings: "2 elder brothers",
    religion: "Islam",
    sect: "Sunni",
    religiousPractice: "Practicing, observes Hijab",
    about: "I work as a graphic designer for a marketing agency in Jeddah. I have grown up between two cultures and value both my heritage and my faith deeply. I'm looking for a kind, practicing partner who is ready for a committed married life built on mutual respect.",
    partnerAge: "26 - 31 years",
    partnerEducation: "Bachelor's or higher",
    partnerLocation: "Saudi Arabia or Pakistan",
    partnerOther: "Practicing, respectful of family values and traditions.",
    income: "N/A"
  }
];


/* =========================================================
   PROFILE CARD RENDERING HELPERS
   ========================================================= */
function profileCardHTML(p) {
  return (
    '<div class="col-lg-4 col-md-6 profile-item" ' +
      'data-gender="' + p.gender + '" data-age="' + p.age + '" ' +
      'data-country="' + p.country + '" data-city="' + p.city + '" ' +
      'data-education="' + p.educationLevel + '" data-profession="' + p.profession + '" ' +
      'data-status="' + p.maritalStatus + '">' +
      '<div class="profile-card">' +
        '<div class="profile-card-photo">' +
          '<img src="' + p.photo + '" alt="' + p.name + ' - Marriage Profile ' + p.id + '">' +
          '<span class="profile-id-badge">' + p.id + '</span>' +
          '<span class="profile-gender-badge">' + p.gender + '</span>' +
        '</div>' +
        '<div class="profile-card-body">' +
          '<h4>' + p.name + '</h4>' +
          '<div class="profile-age-line">' + p.gender + ', ' + p.age + ' Years</div>' +
          '<span class="profile-status-pill">' + p.maritalStatus + '</span>' +
          '<ul class="profile-meta-list">' +
            '<li><i class="fa-solid fa-location-dot"></i>' + p.city + ', ' + p.country + '</li>' +
            '<li><i class="fa-solid fa-graduation-cap"></i>' + p.education + '</li>' +
            '<li><i class="fa-solid fa-briefcase"></i>' + p.profession + '</li>' +
          '</ul>' +
          '<a href="profile-detail.html?id=' + p.id + '" class="btn btn-primary btn-sm-pill">View Profile <i class="fa-solid fa-arrow-right ms-1"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

function renderFeaturedProfiles() {
  var grid = document.getElementById('featuredProfilesGrid');
  var featured = MATRIMONIAL_PROFILES.slice(0, 4);
  grid.innerHTML = featured.map(profileCardHTML).join('');
}


/* =========================================================
   PROFILE LISTING PAGE — FILTERING LOGIC
   ========================================================= */
function initProfileListing() {
  var grid = document.getElementById('profilesGrid');
  grid.innerHTML = MATRIMONIAL_PROFILES.map(profileCardHTML).join('');

  var resultCount = document.getElementById('resultCount');
  var noResults = document.getElementById('noResultsMsg');

  function updateCount(n) {
    if (resultCount) resultCount.textContent = n;
  }
  updateCount(MATRIMONIAL_PROFILES.length);

  var form = document.getElementById('filterForm');
  var genderTabs = document.querySelectorAll('.gender-tab-btn');

  function applyFilters(activeGenderOverride) {
    var gender = activeGenderOverride || (form.gender ? form.gender.value : '');
    var minAge = parseInt(form.minAge.value) || 0;
    var maxAge = parseInt(form.maxAge.value) || 200;
    var country = form.country.value;
    var city = form.city.value.trim().toLowerCase();
    var education = form.education.value;
    var profession = form.profession.value.trim().toLowerCase();
    var status = form.maritalStatus.value;

    var items = grid.querySelectorAll('.profile-item');
    var visibleCount = 0;

    items.forEach(function (item) {
      var itemGender = item.dataset.gender;
      var itemAge = parseInt(item.dataset.age);
      var itemCountry = item.dataset.country;
      var itemCity = item.dataset.city.toLowerCase();
      var itemEducation = item.dataset.education;
      var itemProfession = item.dataset.profession.toLowerCase();
      var itemStatus = item.dataset.status;

      var match = true;
      if (gender && gender !== 'All' && itemGender !== gender) match = false;
      if (itemAge < minAge || itemAge > maxAge) match = false;
      if (country && country !== 'All' && itemCountry !== country) match = false;
      if (city && itemCity.indexOf(city) === -1) match = false;
      if (education && education !== 'All' && itemEducation !== education) match = false;
      if (profession && itemProfession.indexOf(profession) === -1) match = false;
      if (status && status !== 'All' && itemStatus !== status) match = false;

      item.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    updateCount(visibleCount);
    if (noResults) noResults.classList.toggle('d-none', visibleCount !== 0);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      applyFilters();
    });
    form.addEventListener('reset', function () {
      setTimeout(function () {
        genderTabs.forEach(function (b) { b.classList.remove('active'); });
        var allTab = document.querySelector('.gender-tab-btn[data-gender="All"]');
        if (allTab) allTab.classList.add('active');
        applyFilters('All');
      }, 0);
    });
  }

  genderTabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      genderTabs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (form.gender) form.gender.value = btn.dataset.gender;
      applyFilters(btn.dataset.gender);
    });
  });

  /* Support ?gender=Male style deep-link from homepage category cards */
  var params = new URLSearchParams(window.location.search);
  var genderParam = params.get('gender');
  if (genderParam) {
    if (form.gender) form.gender.value = genderParam;
    genderTabs.forEach(function (b) {
      b.classList.toggle('active', b.dataset.gender === genderParam);
    });
    applyFilters(genderParam);
  }
}


/* =========================================================
   PROFILE DETAIL PAGE
   ========================================================= */
function initProfileDetail() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || MATRIMONIAL_PROFILES[0].id;
  var profile = MATRIMONIAL_PROFILES.find(function (p) { return p.id === id; }) || MATRIMONIAL_PROFILES[0];

  document.title = profile.name + ' (' + profile.id + ') — Al-Nikah Matrimonial';

  var set = function (elId, val) {
    var el = document.getElementById(elId);
    if (el) el.textContent = val;
  };
  var setHTML = function (elId, val) {
    var el = document.getElementById(elId);
    if (el) el.innerHTML = val;
  };

  set('pd-name', profile.name);
  set('pd-id', profile.id);
  set('pd-headline', profile.gender + ', ' + profile.age + ' Years • ' + profile.city + ', ' + profile.country);
  set('pd-breadcrumb-name', profile.name);
  var img = document.getElementById('pd-photo');
  if (img) { img.src = profile.photo; img.alt = profile.name + ' - Marriage Profile ' + profile.id; }

  set('pd-age', profile.age + ' Years');
  set('pd-gender', profile.gender);
  set('pd-height', profile.height);
  set('pd-status', profile.maritalStatus);
  set('pd-city', profile.city);
  set('pd-country', profile.country);
  set('pd-nationality', profile.nationality);
  set('pd-age-mini', profile.age + ' Years');
  set('pd-height-mini', profile.height);

  set('pd-education', profile.education);
  set('pd-profession', profile.profession);
  set('pd-occupation', profile.profession);
  set('pd-income', profile.income);
  set('pd-education-mini', profile.education);
  set('pd-profession-mini', profile.profession);

  set('pd-family-bg', profile.familyBackground);
  set('pd-father', profile.fatherOccupation);
  set('pd-mother', profile.motherOccupation);
  set('pd-siblings', profile.siblings);

  set('pd-religion', profile.religion);
  set('pd-sect', profile.sect);
  set('pd-practice', profile.religiousPractice);

  set('pd-about', profile.about);

  set('pd-pref-age', profile.partnerAge);
  set('pd-pref-education', profile.partnerEducation);
  set('pd-pref-location', profile.partnerLocation);
  set('pd-pref-other', profile.partnerOther);

  var enquiryInput = document.getElementById('enquiryProfileId');
  if (enquiryInput) enquiryInput.value = profile.id + ' - ' + profile.name;
  var enquiryLink = document.getElementById('enquiryContactLink');
  if (enquiryLink) enquiryLink.href = 'contact.html?profile=' + profile.id;

  /* Similar profiles: same gender, exclude current */
  var similarGrid = document.getElementById('similarProfilesGrid');
  if (similarGrid) {
    var similar = MATRIMONIAL_PROFILES.filter(function (p) {
      return p.gender === profile.gender && p.id !== profile.id;
    }).slice(0, 3);
    similarGrid.innerHTML = similar.map(profileCardHTML).join('');
  }
}
