class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_tags
  has_many :tags, through: :post_tags

  validates :title, :content, presence: true

  def tags_attributes=(tags)
    tags.values.each do |tag|
      tag = Tag.find_or_create_by(name: tag[:name])
      self.tags << tag unless self.tags.include?(tag)
    end
  end

  def next
    binding.pry
    self.where("id > ", id).first
  end
end
