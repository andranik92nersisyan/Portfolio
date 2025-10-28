import React, { useState, useEffect, useRef } from "react";
import ModalWindow from "./modal/ModalWindow";
import AllGallery from "./ALLGallery";
import Banners from "./Banners";
import YouTubeThumbnails from "./YouTubeThumbnails";
import YouTubeDesign from "./YouTubeDesign";
import InstagramStories from "./instagramStories";
import Review from "./Review";
import Theme from "./Theme";

function Main() {
  const [isPortrait, setIsPortrait] = useState(
    window.innerWidth > window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { theme, setTheme } = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Theme Toggle
  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme("light");
  };

  const darkTheme = () => {
    setTheme("dark");
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const renderComponent = () => {
    switch (selectedCategory) {
      case "All":
        return <AllGallery />;
      case "Banners":
        return <Banners />;
      case "YouTubeThumbnails":
        return <YouTubeThumbnails />;
      case "YouTubeDesign":
        return <YouTubeDesign />;
      case "InstagramStories":
        return <InstagramStories />;
      default:
        return <AllGallery />;
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [
    <Review
      key={1}
      name="John Doe"
      link="https://t.me"
      text="Հաճախորդի կողմից Telegram ալիքում թողած ակնարկի տեքստը կարող եք բացել՝ սեղմելով այս բլոկի վերին աջ անկյունում գտնվող կոճակը։"
    />,
    <Review
      key={2}
      name="Jane Smith"
      link="https://t.me"
      text="Կարծիք թողնվեց Jane Smith կողմից"
    />,
    <Review
      key={3}
      name="Alice Johnson"
      link="https://t.me"
      text="բաժանորդագրվեք Telegram-ին t.me/"
    />,
  ];

  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = "smooth";
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = width;
      box.style.scrollBehavior = "smooth";
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector(".review-card");
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener("scroll", handleScroll);

    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
    setScroll(window.scrollY);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollUp);
  }, []);

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <header>
        {isPortrait ? (
          <div className="navigation">
            <div className="menu">
              <a onClick={upButton}>Our</a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="700"
              >
                Services
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="1230"
              >
                Portfolio
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="1920"
              >
                Reviews
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="2600"
              >
                Guarantees
              </a>
            </div>
            <div className="header-buttons">
              <button onClick={handleOpenModal} className="btn">
                Contact
              </button>

              <a
                href="https://t.me/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon telegram light"
                    : "icon telegram dark"
                }
              />
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon instagram light"
                    : "icon instagram dark"
                }
              />

              <div className="switch" onClick={toggleTheme}>
                <div
                  className={theme === "light" ? "theme light" : "theme dark"}
                  style={{
                    transform: isDarkTheme
                      ? "translateX(38px)"
                      : "translateX(0px)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="navigation"></div>
        )}
      </header>

      <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2 style={{ color: "#4824ff", fontSize: "40px" }}>Contact</h2>
        <p style={{ fontSize: "22px" }}>
          You can contact me on Telegram <br /> or Instagram &#128071;
        </p>
      </ModalWindow>

      <div className="welcome-block">
        <div className="first-block">
          <h1>
            Web Designer <span className="title">Workford</span>
          </h1>
          <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
            I create <span style={{ color: "#4824ff" }}>are for sale</span>
            <br />
            and <span style={{ color: "#4824ff" }}>unique </span>
            design <br /> under your request
          </h2>
          <h3>
            I do web design <br />
            not for sale<span style={{ color: "#4824ff" }}> 3 years</span>
          </h3>
        </div>

        <div className="main-image-box">
          <img
            className="first-image-layer"
            src={theme === "light" ? "./images/Image7.jpg" : "./images/4.png"}
            alt="Overlay Transparent"
            draggable="false"
          />
          <img
            className="second-image-layer dark-layer"
            // src="./images/Image.jpg"
            // alt="Background"
            draggable="false"
          />
        </div>
      </div>

      <div className="service-block" draggable="false">
        <h1 style={{ fontSize: "50px" }}>ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ</h1>
        <p style={{ fontSize: "24px" }}>
          Ես ստեղծագործում եմ
          <span style={{ color: "#4824ff" }}> ստատիկ դիզայն</span> հետևյալ
          ուղղություններով
        </p>

        <div style={{ display: "flex", cursor: "pointer" }}>
          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            գովազդային պաստառներ
          </p>

          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            առաջինը YouTube տեսանյութի համար
          </p>

          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            YouTube ալիքի դիզայն
          </p>

          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            Ինֆոգրաֆիկա
          </p>
        </div>
        <div style={{ display: "flex", marginTop: "20px", cursor: "pointer" }}>
          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            Instagram ալիքի դիզայն
          </p>
          <p className="tag">
            <p
              className={
                theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"
              }
            />
            Facebook ալիքի դիզայն
          </p>
        </div>

        <p style={{ fontSize: "27px" }}>
          Բաց է քննարկման համար դիզայնի ստեղծում և այլ ոլորտներում։ <br />
          <span
            style={{ color: "#4824ff", cursor: "pointer" }}
            onClick={handleOpenModal}
          >
            Կապ հաստատել անձնական նամակագրություն
          </span>
          .
        </p>
      </div>

      <div className="portfolio-block">
        <div className="first-block">
          <h1 className="main-title">Portfolio</h1>
          <div style={{ position: "absolute", marginLeft: "-660px" }}>
            <p className="gradient-part-one"></p>
            <p className="title-border">Portf</p>
          </div>
          <div style={{ position: "absolute", marginLeft: "620px" }}>
            <p className="gradient-part-two"></p>
            <p className="title-border">Folio</p>
          </div>
          <img
            className="array-icon"
            src="./icons/array.png"
            draggable="false"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <p
            className={`tag ${selectedCategory === "All" ? "selected" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </p>
          <p
            className={`tag ${
              selectedCategory === "Banners" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("Banners")}
          >
            Banners
          </p>
          <p
            className={`tag ${
              selectedCategory === "YouTubeThumbnails" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("YouTubeThumbnails")}
          >
            YouTube Thumbnails
          </p>
          <p
            className={`tag ${
              selectedCategory === "YouTubeDesign" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("YouTubeDesign")}
          >
            YouTube Design
          </p>
          <p
            className={`tag ${
              selectedCategory === "InstagramStories" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("InstagramStories")}
          >
            Instagram Stories
          </p>
        </div>

        <div
          className="content"
          style={{ marginLeft: "-5vw", marginRight: "-5vw" }}
        >
          {renderComponent()}
        </div>
      </div>

      <div className="review-block">
        <h1>Արձագանքներ</h1>
        <p className="description">
          Հաճախորդների կարծիքներ, գրված իրենց սեփական կարծիքներից
          <span className="selecting">անձնական հաշիվներ</span>
          Telegram։ Ամեն ինչ թափանցիկ է։
          <br /> Ցանկացած արձագանք հնարավոր է
          <span className="selecting">բացել</span>։ Telegram-ում և
          <span className="selecting">հարցնել</span> ինձ հետ աշխատելու
          տպավորությունների մասին <br />
          անձամբ հեղինակի հետ:
        </p>

        <div className="review-carousel">
          <div className="review-container" ref={containerRef}>
            {reviews.slice(-visibleReviews)}
            {reviews}
            {reviews.splice(1, visibleReviews)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="next-button" style={{ transform: "rotate(180deg)" }}>
            <p className="array-next-icon" onClick={btnPrevReview} />
          </p>
          <p className="next-button">
            <p className="array-next-icon" onClick={btnNextReview} />
          </p>
        </div>
      </div>

      <div className="guarantees-block">
        <h1 style={{ fontSize: "52px", paddingBottom: "20px" }}>Երաշխիքներ</h1>
        <ol className="guarantees-points">
          <li className="point">
            Ընդունվում են վճարումներ վճարային համակարգի միջոցով
            <span style={{ color: "#4824ff" }}> Անուն* </span>. որը վերահսկում է{" "}
            <br /> դրամական փոխանցման անվտանգություն:
          </li>
          <li className="point">
            Իմ պատասխանատվության և պրոֆեսիոնալիզմի մեջ համոզվել կարելի է՝
            <span style={{ color: "#4824ff" }}> հաճախորդներին գրելով </span>,
            <br />
            թողած արձագանքները կարդալով,
            <span style={{ color: "#4824ff" }}> կամ </span>
            անհատական կապ հաստատելով ցանկացած պահի (վերևում՝ հաճախորդների
            արձագանքները)։
          </li>
          <li className="point">
            Ամբողջ
            <span style={{ color: "#4824ff" }}> հեղինակային իրավունքը </span>
            աշխատանքի վրա փոխանցվում է պատվիրատուին պատվերի կատարման ավարտից
            հետո։
          </li>
          <li className="point">
            Իմ աշխատանքներում ես օգտագործում եմ միայն այն նյութերը, որոնք
            <span style={{ color: "#4824ff" }}>
              {" "}
              թույլատրված են անձնական և <br />
              առևտրային օգտագործման համար
            </span>
            ։
          </li>
        </ol>
      </div>

      <footer className="footer">
        <p>© 2025 Web Designer Workford</p>
        <p>All rights reserved.</p>
      </footer>

      <button
        className={scroll < 1960 ? "" : "btn-up"}
        onClick={upButton}
      ></button>
    </div>
  );
}

export default Main;
