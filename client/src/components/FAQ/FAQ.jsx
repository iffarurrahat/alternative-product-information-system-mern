import Container from "../ui/Container";

const FAQ = () => {
  return (
    <Container>
      <div className="my-8 md:my-10 lg:my-16">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl mb-3 md:mb-5 font-semibold">{`FAQ's`}</h2>
          <p className="w-full md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base">
            Answers to common queries about the Alternative Product Information
            System, focusing on providing accurate product information,
            recommendations, and insights.
          </p>
        </div>
        <div className="space-y-3 w-full md:w-3/4 mx-auto">
          {/* collapse-1 */}
          <div className="collapse collapse-plus bg-base-200/30 shadow p-2 md:p-3 lg:p-4">
            <input type="checkbox" />
            <div className="collapse-title font-semibold md:font-medium text-sm md:text-base">
              What is the purpose of the Alternative Product Information System?
            </div>
            <div className="collapse-content text-sm md:text-base">
              <p>
                The Alternative Product Information System is designed to
                provide users with comprehensive and accurate information about
                various products. Our goal is to offer detailed insights,
                recommendations, and resources to help users make informed
                decisions without engaging in buying or selling activities.
              </p>
            </div>
          </div>
          {/* collapse-2 */}
          <div className="collapse collapse-plus bg-base-200/30 shadow p-2 md:p-3 lg:p-4">
            <input type="checkbox" />
            <div className="collapse-title font-semibold md:font-medium text-sm md:text-base">
              Can I purchase or rent products directly through this website?
            </div>
            <div className="collapse-content text-sm md:text-base">
              <p>
                No, the Alternative Product Information System is not a platform
                for purchasing or renting products. Our website is dedicated
                solely to providing information, recommendations, and resources
                related to various products, helping users understand their
                options without any transactional involvement.
              </p>
            </div>
          </div>
          {/* collapse-3 */}
          <div className="collapse collapse-plus bg-base-200/30 shadow p-2 md:p-3 lg:p-4">
            <input type="checkbox" />
            <div className="collapse-title font-semibold md:font-medium text-sm md:text-base">
              How is the information on this website sourced?
            </div>
            <div className="collapse-content text-sm md:text-base">
              <p>
                The information provided on the Alternative Product Information
                System is sourced from reliable and trusted databases, expert
                reviews, and user-generated content. Our team carefully curates
                and verifies the information to ensure that users receive
                accurate and up-to-date details about the products they are
                interested in.
              </p>
            </div>
          </div>
          {/* collapse-4 */}
          <div className="collapse collapse-plus bg-base-200/30 shadow p-2 md:p-3 lg:p-4">
            <input type="checkbox" />
            <div className="collapse-title font-semibold md:font-medium text-sm md:text-base">
              Can I contribute information or suggest products to be featured?
            </div>
            <div className="collapse-content text-sm md:text-base">
              <p>
                Yes, we encourage users to contribute by suggesting products or
                providing feedback on the information available. Your input
                helps us improve the quality and breadth of the content we
                offer. Please visit our Contact Us page to share your
                suggestions or feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
