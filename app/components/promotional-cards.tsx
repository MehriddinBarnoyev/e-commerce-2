export function PromotionalCards() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Скидки</h2>
          <p className="text-gray-200">
            Товары по скидке до -90%
            <br />
            Успей купить по низкой цене!
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Отзывы</h2>
          <p className="text-gray-200">
            Проверенные продавцы с отзывами
            <br />
            Каждая сделка защищена!
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Зови друзей</h2>
          <p className="text-gray-200">
            Делись ссылкой для приглашения —
            <br />
            получай 10% от их первой покупки
          </p>
        </div>
      </div>
    )
  }
  
  