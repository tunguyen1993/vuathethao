import { Inject, Injectable } from "@nestjs/common";
import {
  CATEGORY_ITEM_REPOSITORY,
  POST_REPOSITORY,
} from "../../core/constants";
import { PostEntity } from "./post.entity";
import { CategoryItemEntity } from "../category-item/category-item.entity";

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: typeof PostEntity,
    @Inject(CATEGORY_ITEM_REPOSITORY)
    private readonly categoryItemRepository: typeof CategoryItemEntity,
  ) {}

  async createData() {
    let Random = (array) => array[Math.floor(Math.random() * array.length)];
    let videoLink = [
      "https://www.youtube.com/embed/apeFjGZ1jzA",
      "https://www.youtube.com/embed/G64FJCq1SnI",
      "https://www.youtube.com/embed/8g9fmiNVYNI",
      "https://www.youtube.com/embed/dCdxj-3IrWM",
    ];
    let links = [
      "https://dantri.com.vn/xa-hoi/ve-chiu-tang-me-viet-nam-anh-hung-111-tuoi-chau-noi-tu-nan-o-ninh-binh-20220614152406799.htm",
      "https://www.figma.com/file/0f0q91Q6btTLbfHnmAwaBg/Tin-t%E1%BB%A9c-game-Vi%E1%BB%87t?node-id=0%3A1",
      "https://askubuntu.com/questions/617850/changing-from-user-to-superuser",
      "https://dantri.com.vn/xa-hoi/them-nhieu-thieu-nien-bi-dua-sang-campuchia-khi-di-tim-viec-nhe-luong-cao-20220615082701049.htm",
      "https://dantri.com.vn/xa-hoi/vu-sung-sot-phat-hien-minh-da-chet-con-nhieu-ban-tuong-tu-20220612211104630.htm",
      "https://dantri.com.vn/xa-hoi/mua-lon-o-ha-noi-nhieu-xe-sang-bay-bien-so-ngap-sau-trong-nuoc-20220613232004762.htm",
      "https://dantri.com.vn/phap-luat/tam-giu-dien-vien-hai-huu-tin-dieu-tra-tang-tru-to-chuc-su-dung-ma-tuy-20220614192059913.htm",
      "https://dantri.com.vn/phap-luat/truy-sat-o-quan-oc-song-nua-doi-nguoi-toi-chua-thay-canh-kinh-hoang-vay-20220611184236270.htm",
      "https://dantri.com.vn/bat-dong-san/siet-bat-dong-san-co-phai-la-bop-nghet-gay-kho-20220531230948689.htm",
      "https://dantri.com.vn/bat-dong-san/vach-loat-he-luy-tu-cuoc-dau-gia-dat-khung-tai-thu-thiem-20220531210238087.htm",
      "https://dantri.com.vn/bat-dong-san/du-an-duong-vanh-dai-4-ha-noi-co-gi-dac-biet-20220520160243792.htm",
    ];
    let title = [
      "Vụ xăng Malaysia 13.000 đồng/lít: Thủ tướng yêu cầu theo dõi kỹ để xử lý",
      'Giá xăng "phát sốt", Bộ Tài chính lại đưa ra thêm đề xuất mới',
      'Giá vàng SJC tiếp tục "bốc hơi"',
      'Người mua đất khu đô thị Thanh Hà Cienco 5 bị "treo" xây dựng',
      '"Chất" riêng của Bình Châu - Hồ Tràm trong xu hướng wellness travel',
      "Sau nhiều ồn ào đấu giá đất, Hà Nội có quy định mới tiền đặt cọc",
      'Dự án nào tại đường Lê Văn Lương "ăn bớt" chỗ cây xanh, biến 5 lên 30 tầng?',
      'Thanh tra đường "nhồi" cao ốc Lê Văn Lương - Tố Hữu, lộ đầy rẫy vi phạm',
      'Gần 200 căn biệt thự, liền kề tiền tỷ được "chốt đơn" chỉ trong một ngày',
      'Vạch loạt "góc khuất" trong đấu giá đất, dìm giá từ 500 tỷ đồng còn một nửa',
      'Siết bất động sản có phải là "bóp nghẹt", gây khó?',
    ];
    let contents = [
      '(Dân trí) - "Sống hơn nửa đời người rồi mà tôi chưa bao giờ thấy cảnh kinh hoàng như vậy. Ai ai cũng cầm mã tấu, dao, tiếng bom xăng cứ nổ khiến tôi ám ảnh", bà H. (nhân chứng vụ truy sát ở quán ốc) hãi hùng kể.',
      '(Dân trí) - Theo cáo buộc, "bà trùm" Nguyễn Thị Nguyệt cùng chồng liên hệ nhân viên 3 ngân hàng lớn để thực hiện chuyển tiền dưới hình thức thanh toán quốc tế.',
      "(Dân trí) - Liên quan đến vụ Việt Á, đến nay, Cơ quan điều tra Bộ Công an, Bộ Quốc phòng và Công an các địa phương đã khởi tố 70 đối tượng, trong đó có hai cựu Bộ trưởng Bộ Y tế và Bộ Khoa học và Công nghệ.",
      "(Dân trí) - Phó Giáo sư - Tiến sĩ Bùi Hoài Sơn, Đại biểu Quốc hội khóa XV, Ủy viên Thường trực Ủy ban Văn hóa, Giáo dục của Quốc hội đã thẳng thắn trao đổi với phóng viên Dân trí về vấn đề này.",
      '(Dân trí) - Lần đầu "chạm ngõ" màn ảnh với vai nam chính trong phim "Lối nhỏ vào đời", Long Hoàng chia sẻ với PV Dân trí rằng, đó sự may mắn và tiết lộ hoàn cảnh của mình cũng khác xa trên phim.',
      'Vua hài của làng giải trí châu Á" Châu Tinh Trì sở hữu khối tài ước tính gần 7 nghìn tỷ đồng nhưng không kết hôn, không có con. Người thân của ông chỉ có mẹ cùng em gái và chị gái.',
      "(Dân trí) - Có mức thu nhập từ vài trăm đến cả tỷ đồng mỗi năm nhưng một số hộ dân tại xã Krông Jing (huyện M'Đrắk, Đắk Lắk) bất ngờ khi biết gia đình mình có tên trong danh sách hộ nghèo từ nhiều năm trước.",
      "(Dân trí) - Do tuổi già, sức yếu, Mẹ Việt Nam anh hùng Nguyễn Thị Tân trút hơi thở cuối cùng vào tối 13/6, hưởng thọ 111 tuổi. Mẹ nhắm mắt xuôi tay vẫn đau đáu việc tìm hài cốt một người con trai liệt sĩ.",
      "(Dân trí) - UBND TP Hà Nội khẳng định, đến nay chủ đầu tư Khu đô thị Thanh Hà Cienco 5 (Hà Nội) chưa hoàn thiện thủ tục pháp lý... nên chưa đủ điều kiện để tiếp tục triển khai xây dựng công trình.",
      "(Dân trí) - Nhiều người xuất cảnh sang Campuchia bị tra tấn, đánh đập khi tìm cách trốn khỏi nơi làm việc. Những người muốn quay về Việt Nam thì bị bắt ký khống giấy nợ và yêu cầu bồi thường hàng ngàn USD",
      "(Dân trí) - Du lịch Việt hồi sinh trở lại kéo theo xu hướng wellness travel bùng nổ. Điều này đã tác động mạnh đến thị trường bất động sản biển, trong đó, những điểm đến có thế mạnh phục hồi và chăm sóc sức khỏe sẽ có nhiều điều kiện bứt phá.",
      "(Dân trí) - Mỹ đang khuyến khích các công ty tăng cường mua phân bón của Nga trong bối cảnh giá lương thực trên toàn cầu gia tăng và xuất hiện tình trạng thiếu hụt.",
      "(Dân trí) - Trong vòng một tháng, Công ty cổ phần Tập đoàn Gelex đã tổ chức 4 đợt mua lại trái phiếu với tổng giá trị 1.500 tỷ đồng.",
      '(Dân trí) - Vàng SJC có một phiên giao dịch sóng gió khi "bốc hơi" 700.000 đồng/lượng trong ngày 13/6, đến 14/6 thì tiếp tục giảm.',
      '(Dân trí) - Bất chấp việc đã giảm 50% thuế bảo vệ môi trường, giá một lít xăng ở Việt Nam vẫn phải "gánh còng lưng" thuế phí. Nếu mua 100.000 đồng tiền xăng, người dân phải đóng 34.200 đồng là thuế phí.',
      "Văn phòng Chính phủ vừa có văn bản gửi Bộ Công Thương truyền đạt ý kiến chỉ đạo của Thủ tướng Chính phủ Phạm Minh Chính về thông tin giá xăng dầu và khả năng cung cấp xăng dầu của Malaysia cho Việt Nam.",
    ];
    let user_list = [1, 2, 3, 4];
    let images = [
      "https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wGBbcC_rZFSn3PEF6L34jkUjgR6oER7o2sFXzzRmB-Rx2fqaQxKjcZWbpU4vrveQM60&usqp=CAU",
      "https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9quVJ8hZqsPWgDRlIhFNwhpH3fS5xE75fe6uotxvTB3s9o4LsYCufH6uNcUaNOsPdn-8&usqp=CAU",
      "https://www.zenithtechs.com/wp-content/uploads/2021/06/remove-background-from-image-with-remove-bg-tutorials.jpg",
      "https://png.pngtree.com/illustrations/20190327/ourmid/pngtree-cure-starry-sky-night-sky-star-png-image_38228.jpg",
      "https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-1520x800.jpeg",
      "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd_Di-ZXvs7369z-X9C9o_tDblUPi3eVkk7wWUe8IXcPcRVxz9Fo8aKpwIhZTuEfxkv0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6CFxEdks8wGHKZfuVBi8CRioiObB-e9pWivva33j5OwkDB7CEC94NjFDCNwXjtwge64&usqp=CAU",
    ];
    let type = ["SUBSCRIBE"];
    let categoryId = {
      CARD: 2,
      DEFAULT: 1,
      GAME_MOBILE: 6,
      VIDEO: 4,
      AGENCY: 5,
      SUBSCRIBE: 7,
    };
    let prices = [100000, 50000, 100000, 30000, 20000];
    let promotions = [0, 10, 20, 30, 40, 50, 60, 80];
    let email = [
      "Tunguyen@gmail.com",
      "Tunguyen2@gmail.com",
      "Tunguyen4@gmail.com",
      "Tunguyen5@gmail.com",
    ];
    function createDefaultPost(item) {
      switch (item) {
        case "DEFAULT":
          return {
            title: Random(title),
            image: Random(images),
            link: Random(links),
            type: item,
            content: Random(contents),
            user_id: Random(user_list),
          };
        case "VIDEO":
          return {
            title: Random(title),
            video: Random(videoLink),
            user_id: Random(user_list),
            type: item,
          };
        case "CARD":
          return {
            title: Random(title),
            image: Random(images),
            link: Random(links),
            user_id: Random(user_list),
            promotion: Random(promotions),
            pricing: Random(prices),
            type: item,
          };
        case "ADS":
          return {
            title: Random(title),
            link: Random(links),
            image: Random(images),
            user_id: Random(user_list),
            type: item,
          };
        case "GAME_MOBILE":
          return {
            title: Random(title),
            link: Random(links),
            image: Random(images),
            user_id: Random(user_list),
            type: item,
          };
        case "AGENCY":
          return {
            title: "Nguyễn Hà Lan 1",
            image: Random(images),
            link: Random(email),
            content: "0994.333.333",
            user_id: Random(user_list),
            type: item,
          };
        case "SUBSCRIBE":
          return {
            title:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet nulla nec pellentesque sollicitudin",
            image: Random(images),
            link: Random(links),
            user_id: Random(user_list),
            type: item,
          };
      }
    }

    type.map(async (item) => {
      for (let i = 0; i < 100; i++) {
        let data = createDefaultPost(item);
        console.log(data);
        let response = await this.postRepository.create(data);
        if (item === "DEFAULT" && i > 60) {
          await this.categoryItemRepository.create({
            post_id: response.id,
            category_id: 3,
          });
        }
        if (categoryId[item]) {
          await this.categoryItemRepository.create({
            post_id: response.id,
            category_id: categoryId[item],
          });
        }
      }
    });
  }
}
